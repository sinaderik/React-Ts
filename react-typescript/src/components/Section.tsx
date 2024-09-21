import { ReactNode } from "react";

type SectionProps={
    title?:string,
    children:ReactNode
}

export const Section =({ children, title='sub header' }:SectionProps) => {
    return (
        <>
            <h2>{title}</h2>
            <p>{children}</p>
        </>
    )
}
// The older way of defining a react component
// export const Section: React.FC<{ children, title }> = ({ children, title }) => {
//     return (
//         <>
//             <h2>{title}</h2>
//             <p>{children}</p>
//         </>
//     )
// }