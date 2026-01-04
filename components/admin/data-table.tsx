
"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sendOutreachEmails, deleteProspects, bulkUpdateStatus } from "@/app/admin/actions"
import { toast } from "sonner"
import { Trash2, CheckCircle, Mail } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [isSending, setIsSending] = React.useState(false)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    const handleBulkAction = async (action: 'email' | 'delete' | 'contacted') => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => (row.original as any).id)
        if (selectedIds.length === 0) return

        let confirmMsg = ""
        if (action === 'email') confirmMsg = `Envoyer un email de démarchage pro à ${selectedIds.length} prospects ?`
        if (action === 'delete') confirmMsg = `Supprimer DÉFINITIVEMENT ${selectedIds.length} prospects ?`
        if (action === 'contacted') confirmMsg = `Marquer ${selectedIds.length} prospects comme 'Contacté' (sans envoyer d'email) ?`

        if (!confirm(confirmMsg)) return;

        setIsSending(true)
        try {
            let result;
            if (action === 'email') result = await sendOutreachEmails(selectedIds)
            if (action === 'delete') result = await deleteProspects(selectedIds)
            if (action === 'contacted') result = await bulkUpdateStatus(selectedIds, 'contacted')

            if (result && result.success) {
                toast.success(result.message)
                setRowSelection({})
                if (action === 'delete' || action === 'contacted') {
                    window.location.reload() // Force Refresh for state/data update
                }
            } else {
                toast.error(result?.message || "Erreur inconnue")
            }
        } catch (e) {
            toast.error("Erreur technique")
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between py-4 gap-4">
                <div className="flex gap-2 flex-1">
                    <Input
                        placeholder="Filtrer par nom..."
                        value={(table.getColumn("business_name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("business_name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    {/* ... other filters ... */}
                </div>

                {Object.keys(rowSelection).length > 0 && (
                    <div className="flex gap-2 animate-in fade-in slide-in-from-right-5">
                        <Button
                            onClick={() => handleBulkAction('delete')}
                            disabled={isSending}
                            variant="destructive"
                            size="sm"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer ({Object.keys(rowSelection).length})
                        </Button>
                        <Button
                            onClick={() => handleBulkAction('contacted')}
                            disabled={isSending}
                            variant="outline"
                            size="sm"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Marquer Contacté
                        </Button>
                        <Button
                            onClick={() => handleBulkAction('email')}
                            disabled={isSending}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            size="sm"
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            {isSending ? "Envoi..." : `Démarcher (${Object.keys(rowSelection).length})`}
                        </Button>
                    </div>
                )}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Aucun résultat.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} sur {table.getFilteredRowModel().rows.length} lignes sélectionnées.
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Précédent
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Suivant
                </Button>
            </div>
        </div>
    )
}
