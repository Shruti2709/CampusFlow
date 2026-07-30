export default function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">

        <div>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            AI Powered Campus Platform
          </span>

          <h1 className="text-6xl font-black mt-8 leading-tight">
            Manage Your
            <span className="text-blue-600"> Entire Campus </span>
            From One Dashboard
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-8">
            CampusFlow helps students and administrators manage placements,
            events, complaints, notices, resumes, lost & found and much more.
          </p>

          <div className="mt-10 flex gap-5">

            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Get Started
            </button>

            <button className="px-8 py-4 border rounded-xl hover:bg-gray-100 transition">
              View Demo
            </button>

          </div>

        </div>

        <div>

          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <h2 className="text-2xl font-bold">
              Student Dashboard
            </h2>

            <div className="space-y-5 mt-8">

              <div className="bg-slate-100 rounded-xl p-5 flex justify-between">

                <div>
                  <h3 className="font-semibold">
                    Microsoft
                  </h3>

                  <p className="text-gray-500">
                    Software Engineer
                  </p>

                </div>

                <span className="text-green-600 font-bold">
                  Eligible
                </span>

              </div>

              <div className="bg-slate-100 rounded-xl p-5 flex justify-between">

                <div>
                  <h3 className="font-semibold">
                    Adobe
                  </h3>

                  <p className="text-gray-500">
                    Frontend Developer
                  </p>

                </div>

                <span className="text-blue-600 font-bold">
                  Applied
                </span>

              </div>

              <div className="bg-slate-100 rounded-xl p-5 flex justify-between">

                <div>
                  <h3 className="font-semibold">
                    Amazon
                  </h3>

                  <p className="text-gray-500">
                    SDE
                  </p>

                </div>

                <span className="text-orange-600 font-bold">
                  Upcoming
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}