import Header from "@/app/components/Header";
import Background from "@/app/components/Background";
export default function Dashborad(){
    return (
        <>
            <div className="relative h-screen w-screen overflow-hidden bg-background justify-items-center">
        <Header stay={true}/>
                <Background>

                </Background>
            </div>
        </>
)
}