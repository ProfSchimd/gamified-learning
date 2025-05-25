import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
});

export default function BitMasterLogo() {
    return (
        <div className="my-10">
            <p className={`py-2 text-4xl text-emerald-500 tracking-widest ${pressStart2P.className}`}>
                BITMASTER
            </p>
            <p className={`py-2 text-xl text-emerald-100 tracking-wider ${pressStart2P.className}`}>
                CONVERT FAST. THINK BINARY.
            </p>
            <p className={`py-2 text-sm text-emerald-500 tracking-wide font-['Courier_New',monospace]`}>
                01100010 01101001 01110100 01101101 01100001 01110011 01110100 01100101 01110010
            </p>
        </div>
    );
}