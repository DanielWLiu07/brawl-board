import Image from "next/image";

export const EmptyOrg = () => {
    return(
        <div className = "h-full flex flex-col items-center justify-center">
            Empty
            <Image
                src = "/globe.svg"
                alt="Missing Org"
                height={200}
                width={200}
            />
            <h2 className="text-2xl font-semibold mt-6">
                Welcome to Board
            </h2>
            <p className= "text-muted-foreground mt-2 text-sm">
                Create an Organization to get started!
            </p>
            
        
        </div>
    )


}