"use client";
import { BinaryConverter } from "@/components/binary";

export default function BinaryConverterUtil() {
    const N = 1;
    return (
            <div className="flex flex-1 w-full">
                {[...Array(N)].map((_, i) => (
                    <div key={i} className="flex-1 min-w-0">
                        <BinaryConverter digits={8} dynClass={(v, i) => ( v === 1 ? "bg-red-300" : "bg-green-300")}/>
                    </div>
                ))}
            </div>
    );
}