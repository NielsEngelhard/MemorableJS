import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import Link from "next/link";

interface AdminPage {
    name: string;
    href: string;
}

const adminPages = [
    {
        name: "websocket test",
        href: "/admin/test-websocket"
    }
]

export default function AdminPage() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
            {adminPages.map((p) => {
                return (
                    <Link href={p.href}>                        
                            <Card>
                                <CardBody>
                                    {p.name}
                                </CardBody>
                            </Card>                        
                    </Link>              
                )
            })}
        </div>
    )
}