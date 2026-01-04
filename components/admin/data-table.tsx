
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
import { sendOutreachEmails } from "@/app/admin/actions"
import { toast } from "sonner"

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

    const handleSendEmails = async () => {
        const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => (row.original as any).id)
        if (selectedIds.length === 0) return

        if (!confirm(`Envoyer un email de démarchage pro à ${selectedIds.length} prospects ?`)) return;

        setIsSending(true)
        try {
            const result = await sendOutreachEmails(selectedIds)
            if (result.success) {
                toast.success(result.message)
                setRowSelection({})
            } else {
                toast.error(result.message)
            }
        } catch (e) {
            toast.error("Erreur technique lors de l'envoi")
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Filtrer par nom..."
                        value={(table.getColumn("business_name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("business_name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Input
                        placeholder="Filtrer par ville..."
                        value={(table.getColumn("city")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("city")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>

                {Object.keys(rowSelection).length > 0 && (
                    <Button
                        onClick={handleSendEmails}
                        disabled={isSending}
                        className="bg-purple-600 hover:bg-purple-700 text-white animate-in zoom-in"
                    >
                        {isSending ? "Envoi..." : `Démarcher (${Object.keys(rowSelection).length})`}
                    </Button>
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
