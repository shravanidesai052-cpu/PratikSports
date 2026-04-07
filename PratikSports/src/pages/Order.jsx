import Navbar from "../components/Navbar";
import JerseyOrderForm from "../forms/JerseyOrderForm";

export default function Order() {
  return (
    <>
      <Navbar />

      {/* Page Background */}
      <div className="min-h-screen bg-slate-50 p-6">

        {/* Centered Container */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-slate-200">

          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            🏏 Jersey Order Form
          </h1>

          <JerseyOrderForm />
        </div>

      </div>
    </>
  );
}