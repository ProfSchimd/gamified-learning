import { Alfa_Slab_One } from "next/font/google"

const alphaSlab = Alfa_Slab_One({
  weight: '400',
  subsets: ['latin'],
})

export default function MasKingLogo() {
    return (
        <>
            <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                <text className="fill-sky-500/30" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                    fontFamily="monospace" fontSize="18">
                    11000000.10101000.00001010.11111110
                </text>

                <text className={`${alphaSlab.className} fill-sky-100 text-5xl tracking-widest`} x="50%" y="60%" dominantBaseline="middle" textAnchor="middle">
                    MasKing
                </text>

                <text className="text-3xl" x="54%" y="25" textAnchor="middle">
                    👑
                </text>

                <text className="fill-sky-600 text-mono" x="50%" y="94%" dominantBaseline="middle" textAnchor="middle"
                    fontFamily="monospace" fontSize="14">
                    Be the K.I.N.G/Masks
                </text>
            </svg>
        </>
    )
}