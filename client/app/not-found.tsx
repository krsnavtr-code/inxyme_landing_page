export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto text-3xl font-black">
          404
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          This portal only serves dedicated certification course subdomains.
          Please visit using a valid subdomain (e.g.{" "}
          <code className="bg-slate-100 text-[#1565c0] px-2 py-0.5 rounded-md font-mono text-xs">
            sap.inxyme.com
          </code>
          ).
        </p>
        <div className="pt-2">
          <span className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Inxyme
          </span>
        </div>
      </div>
    </div>
  );
}
