
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

// This type is used to define the shape of our data.
export type Prospect = {
    id: string
    place_id: string
    business_name: string
    business_type: string
    city: string
    email: string | null
    phone: string | null
    rating: number
    rating_count: number
    hunt_status: string // qualified, contacted, etc
    demo_screenshot_url: string | null
    created_at: string
    url: string
}

export const columns: ColumnDef<Prospect>[] = [
    {
        accessorKey: "business_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="font-medium ml-4">{row.getValue("business_name")}</div>,
    },
    {
        accessorKey: "business_type",
        header: "Métier",
        cell: ({ row }) => <Badge variant="outline">{row.getValue("business_type")}</Badge>,
    },
    {
        accessorKey: "city",
        header: "Ville",
    },
    {
        accessorKey: "rating",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Note
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const rating = parseFloat(row.getValue("rating"))
            const count = row.original.rating_count
            let color = "text-gray-500"
            if (rating >= 4.5) color = "text-green-600 font-bold"
            else if (rating >= 4.0) color = "text-blue-600"

            return <div className={`ml-4 ${color}`}>{rating} <span className="text-gray-400 text-xs">({count})</span></div>
        },
    },
    {
        accessorKey: "email",
        header: "Contact",
        cell: ({ row }) => {
            const email = row.getValue("email") as string
            if (!email) return <span className="text-gray-400">-</span>
            return (
                <div
                    className="text-blue-600 cursor-pointer hover:underline text-xs truncate max-w-[150px]"
                    onClick={() => navigator.clipboard.writeText(email)}
                    title="Cliquer pour copier"
                >
                    {email}
                </div>
            )
        }
    },
    {
        accessorKey: "hunt_status",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.getValue("hunt_status") as string
            return (
                <Badge className={
                    status === 'qualified' ? 'bg-green-100 text-green-800 border-green-200' :
                        status === 'contacted' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-800'
                }>
                    {status.toUpperCase()}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const prospect = row.original

            return (
                <div className="flex items-center gap-2">
                    {/* PREVIEW BUTTON */}
                    {prospect.demo_screenshot_url && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="Voir la capture">
                                    <Eye className="h-4 w-4 text-purple-600" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gray-100 border-none">
                                <img
                                    src={prospect.demo_screenshot_url}
                                    alt={`Demo for ${prospect.business_name}`}
                                    className="w-full h-auto max-h-[85vh] object-contain"
                                />
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <Button onClick={() => window.open(prospect.url, '_blank')} className="bg-white text-black hover:bg-gray-200">
                                        Visiter le site <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(prospect.email || "")}>
                                Copier Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Marquer comme Contacté</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
