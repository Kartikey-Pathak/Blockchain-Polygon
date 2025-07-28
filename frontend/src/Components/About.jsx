function About() {
    return (
        <div className=" h-screen*2  w-full max-w-screen flex items-center relative flex-col">
            <div className=" w-[80%] h-full flex items-center justify-center flex-col gap-10 ">
                <h1 className=" text-4xl text-purple-400 shadow-2xl shadow-purple-400 font-bold">About</h1>
                <h2 className=" font-semibold text-white text-3xl">PolyDash is a full-stack crypto dashboard designed and developed with a mission to make live crypto tracking intuitive, reliable, and beautifully simple.

                    Built from scratch using Node.js, Express, MongoDB, and React, PolyDash delivers a seamless experience where users can:

                    🔄 Track live cryptocurrency prices with auto-refresh every 60 seconds

                    📈 View detailed coin stats and real-time graphs

                    💾 Save favorite coins to their account for easy access

                    📬 Experience a secure system with email-based OTP verification for sign-up, login, password reset, and account deletion alerts

                    📱 Enjoy a fully responsive UI inspired by Polygon design principles, optimized for mobile and desktop

                </h2>
                <h1 className="text-4xl font-bold text-purple-400 shadow-2xl shadow-purple-400">🔐 Hosted with Performance in Mind</h1>
                <h2 className=" font-semibold text-white text-3xl">
                    The backend is hosted on Render, which conserves resources by sleeping when idle. But don’t worry — it wakes up in just 15–20 seconds and runs as fast as lightning afterward.
                    The frontend is deployed on Vercel for maximum speed and reliability.
                </h2><br />
                <h1 className="text-4xl font-bold text-purple-400 shadow-2xl shadow-purple-400">Upcoming Features</h1>
                <h2 className=" font-semibold text-white text-3xl">
                    🔐 JWT Authentication for even more secure user sessions

                    📝 A built-in Feedback Feature, so users can directly share suggestions or bugs


                </h2><br />
                <h1 className="text-4xl font-bold text-purple-400 shadow-2xl shadow-purple-400">👨‍💻 Built By</h1>
                <h2 className=" font-semibold text-white text-3xl">
                    Kartikey Pathak
                    B.Tech CSE | Full-Stack & DSA Enthusiast
                    I created PolyDash not only to strengthen my skills in real-world development but also to build something meaningful for the crypto community.

                    Let's connect 👉 <span className=" text-blue-500 font-medium underline"><a href="https://www.linkedin.com/in/kartikey-pathakb580297/">Linkedin</a></span>
                </h2>
            </div>
        </div>
    )
}
export default About;