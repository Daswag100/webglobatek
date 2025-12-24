import Sidebar from "@/components/Sidebar"
import GuardStoreInitializer from "@/components/providers/GuardStoreInitializer"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <GuardStoreInitializer>
            <div className="flex">
                <Sidebar />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </GuardStoreInitializer>
    )
}
