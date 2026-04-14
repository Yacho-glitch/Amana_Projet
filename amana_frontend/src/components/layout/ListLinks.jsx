import { NavLink } from "react-router-dom";

export function ListLinks({ links }) {

    return (
        <div className="grid grid-cols-7 gap-2 mb-6 pb-2">
            {links.map(({ label }) => (
                <NavLink
                    key={label}
                    className="text-gray-500 font-bold text-xs text-center pb-2 hover:text-blue-500 hover:border-b-3 hover:border-blue-500"
                    onClick={() => {
                        console.log(`the target is : ${label}`);
                    }}
                >{label.toUpperCase()}</NavLink>
            ))}
        </div>
    );
}