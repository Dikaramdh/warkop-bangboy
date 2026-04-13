import { Coffee } from "lucide-react"
import Link from "next/link"


export const Footer = ()=> {
    return (
        <footer className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white py-10 border-t border-amber-700/60">
            <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-5">
                <Coffee className="h-6 w-6 text-amber-300" />
                <span className="text-2xl font-semibold">Warkop Bangboy</span>
            </div>
            <p className="text-amber-100/90 mb-1">
                Email: warkopbangboy47@gmail.com
            </p>
            <p className="text-amber-100/90 mb-1">
                No telp: 0858449892754
            </p>
            <p className="text-amber-100/90 max-w-4xl mx-auto mb-4 text-sm sm:text-base break-words">
                Alamat: KOPI SEMPER, RT.1/RW.1, Semper Bar., Kec. Cilincing, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14130 Jakarta, Indonesia
            </p>
            <Link href='/auth/login' className="inline-block rounded-full border border-amber-200/40 px-4 py-1 text-sm text-amber-100 hover:bg-amber-100/10 transition-colors">admin panel</Link>
            </div>
      </footer>
    )
}
