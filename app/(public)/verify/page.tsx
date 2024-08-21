'use client'

import { useState, useEffect } from "react"
import { useGetEventAttendees } from "@/lib/query-hooks"
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode"
import { FetchedAttendeeProps } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircleIcon, Keyboard, QrCode, Users, XCircleIcon, Loader2 } from "lucide-react"

export default function Component() {
    const [eventID, setEventID] = useState("")
    const [qrData, setQrData] = useState("")
    const [manualCode, setManualCode] = useState("")
    const [matchResult, setMatchResult] = useState<string | null>(null)
    const [showVerification, setShowVerification] = useState(false)
    const [showAttendees, setShowAttendees] = useState(false)
    const [activeTab, setActiveTab] = useState('qr')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successCount, setSuccessCount] = useState(0)
    const [verifiedTickets, setVerifiedTickets] = useState(new Set())

    const { data: attendees, isLoading, refetch } = useGetEventAttendees(eventID)

    const handleEventIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventID(e.target.value)
    }

    const handleManualCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setManualCode(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        const result = await refetch()
        if (result.data && result.data.length > 0) {
            setShowVerification(true)
        } else {
            alert("Invalid Event ID. Please try again.")
        }
        setIsSubmitting(false)
    }

    const handleManualCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        checkTicketNumber(manualCode)
        setManualCode("")
    }

    const initializeQRCodeScanner = () => {
        const config = {
            fps: 10,
            qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
                const minEdgePercentage = 0.7
                const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight)
                const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage)
                return { width: qrboxSize, height: qrboxSize }
            },
            aspectRatio: 1,
            supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        }

        const html5QrCode = new Html5QrcodeScanner("qr-reader", config, false)

        html5QrCode.render(
            (decodedText: string) => {
                handleQRScan(decodedText)
            },
            (error: any) => {
                console.error(error)
            }
        )

        return () => {
            html5QrCode.clear()
        }
    }

    const handleQRScan = (decodedText: string) => {
        if (decodedText) {
            setQrData(decodedText)
            checkTicketNumber(decodedText)
        }
    }

    const normalizeTicketNumber = (ticketNumber: string) => {
        return ticketNumber.replace(/[\s-]/g, "").toLowerCase()
    }

    const checkTicketNumber = (ticketNumber: string) => {
        const normalizedTicketNumber = normalizeTicketNumber(ticketNumber)

        if (attendees) {
            const isMatch = attendees.some(
                (attendee: FetchedAttendeeProps) =>
                    normalizeTicketNumber(attendee.ticket_code) === normalizedTicketNumber
            )
            setMatchResult(isMatch ? "yes" : "no")
            if (isMatch && !verifiedTickets.has(normalizedTicketNumber)) {
                setVerifiedTickets(prev => new Set(prev).add(normalizedTicketNumber))
                setSuccessCount(prev => prev + 1)
            }
        } else {
            setMatchResult("no")
        }

        setTimeout(() => {
            setMatchResult(null)
            setQrData("")
        }, 1300)
    }

    useEffect(() => {
        if (showVerification) {
            if (activeTab === 'qr') {
                const cleanupScanner = initializeQRCodeScanner()
                return cleanupScanner
            } else {
                const element = document.getElementById('qr-reader')
                if (element) {
                    element.innerHTML = ''
                }
            }
        }
    }, [showVerification, activeTab])

    if (!showVerification) {
        return (
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow flex items-center justify-center bg-gray-100 p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Enter Event ID</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex flex-col space-y-2">
                                    <Input
                                        id="eventID"
                                        type="text"
                                        value={eventID}
                                        onChange={handleEventIDChange}
                                        placeholder="Event ID"
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Verifying...
                                            </>
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
                    © 2024 ConnectTeam. All rights reserved.
                </footer>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow container mx-auto p-4 max-w-4xl">
                <Card className="mb-4 shadow-sm">
                    <CardHeader className="flex flex-col border-b border-dashed sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                        <CardTitle className="mb-3">Connect Ticket Verifier</CardTitle>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowAttendees(!showAttendees)}
                                className="mr-2 mb-3 lg:mr-0 lg:mb-0"
                            >
                                <Users className="mr-2 h-4 w-4" />
                                {showAttendees ? "Hide" : "Show"} Attendees
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setActiveTab('qr')}
                            >
                                <QrCode className="mr-2 h-4 w-4" />
                                QR Scan
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setActiveTab('manual')}
                            >
                                <Keyboard className="mr-2 h-4 w-4" />
                                Code Entry
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-3">
                        <p className="text-sm text-gray-500">Event ID: {eventID}</p>
                        <p className="text-sm text-gray-500">Total Attendees: {attendees?.length || 0}</p>
                        <p className="text-sm text-gray-500">Succesful Verifications: {successCount}</p>
                    </CardContent>
                </Card>

                {showAttendees && (
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>Event Attendees</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center items-center h-24">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                </div>
                            ) : attendees && attendees.length > 0 ? (
                                <div className="max-h-64 overflow-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Ticket ID</TableHead>
                                                <TableHead>Ticket Code</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {attendees.map((attendee) => (
                                                <TableRow key={attendee.id}>
                                                    <TableCell>{attendee.ticket_id}</TableCell>
                                                    <TableCell>{attendee.ticket_code}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <p className="text-center py-4">No attendees found</p>
                            )}
                        </CardContent>
                    </Card>
                )}
                {matchResult && (
                    <Card className="shadow mb-4">
                        <CardContent className="pt-6">
                            <Alert
                                variant={matchResult === "yes" ? "default" : "destructive"}
                                className={`${matchResult === "yes" ? "bg-green-100 border-green-400" : ""} transition-all duration-300 ease-in-out`}
                            >
                                <AlertTitle className="flex items-center">
                                    {matchResult === "yes" ? (
                                        <CheckCircleIcon className="mr-2 h-4 w-4 text-green-600" />
                                    ) : (
                                        <XCircleIcon className="mr-2 h-4 w-4" />
                                    )}
                                    Verification Result
                                </AlertTitle>
                                <AlertDescription className={matchResult === "yes" ? "text-green-800" : ""}>
                                    {matchResult === "yes"
                                        ? "Ticket verified successfully!"
                                        : "Ticket not found or invalid."}
                                </AlertDescription>
                            </Alert>
                            {qrData && (
                                <div className="mt-4">
                                    <h3 className="font-semibold">Ticket Code:</h3>
                                    <p className="text-sm text-gray-600">{qrData}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {activeTab === 'qr' && (
                        <Card className="overflow-hidden">
                            <CardHeader className="p-4">
                                <CardTitle className="font-medium">QR Code Scanner</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div id="qr-reader" className="w-full h-[400px] lg:h-[400px]"></div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'manual' && (
                        <Card className="shadow">
                            <CardHeader>
                                <CardTitle>Ticket Code Entry</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleManualCodeSubmit} className="space-y-4">
                                    <Input
                                        id="manualCode"
                                        type="text"
                                        value={manualCode}
                                        onChange={handleManualCodeChange}
                                        placeholder="Enter Ticket Code manually"
                                        required
                                    />
                                    <Button type="submit" className="w-full rounded-2xl">Verify</Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}


                </div>
            </div>
            <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
                © 2024 ConnectTeam. All rights reserved.
            </footer>
        </div>
    )
}