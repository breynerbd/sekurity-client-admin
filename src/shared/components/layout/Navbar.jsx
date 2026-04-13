import imgLogo from "../../../assets/img/sekurity_logo.png"

export const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="w-full px-4 h-16 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <img
                        src={imgLogo}
                        alt="Sekurity Logo"
                        className="h-10 w-auto"
                    />

                    <div className="flex flex-col leading-tight">
                        <span className="font-bold text-gray-900 text-base tracking-tight">
                            Sekurity
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Admin Panel
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className="text-xs font-bold text-gray-800">Admin User</p>
                        <p className="text-[10px] text-gray-400">admin@sekurity.com</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold text-xs">
                        AU
                    </div>
                </div>
            </div>
        </nav>
    );
};