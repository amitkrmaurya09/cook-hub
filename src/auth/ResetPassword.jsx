export default function ResetPassword({ email, handleFlow }) { // Use handleFlow
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Using handleFlow will automatically setView("login") per your AuthFlow.jsx logic
    const res = await handleFlow("reset", { email, password });
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5"> 
       <div className="text-center">
        <h2 className="text-2xl font-semibold">Reset Password</h2>
      </div>
      <input
        type="password"
        className="w-full px-3 py-2 rounded-lg border border-gray-300"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white">
        Reset
      </button>
    </form>
  );
}