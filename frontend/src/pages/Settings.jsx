
import { useRef, useState } from "react";

import {
  UserRound,
  Mail,
  ShieldCheck,
  Camera,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  LockKeyhole,
  ChevronRight,
} from "lucide-react";

import {
  updateUser,
  uploadProfileImage,
} from "../api/userApi";

function Settings() {
  const fileInputRef = useRef(null);

  const [storedUser, setStoredUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  });

  const [formData, setFormData] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
  });

  const [profileImage, setProfileImage] = useState(
    storedUser.profileImage ||
    storedUser.profilePicture ||
    ""
  );

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ==========================================
  // Handle Input
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSuccessMessage("");
    setErrorMessage("");
  };

  // ==========================================
  // Open Image Picker
  // ==========================================

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // ==========================================
  // Upload Profile Image
  // ==========================================

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSuccessMessage("");
    setErrorMessage("");

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB.");
      return;
    }

    try {
      setUploadingImage(true);

      const imageData = new FormData();

      imageData.append("profileImage", file);

      const response = await uploadProfileImage(imageData);

      console.log("PROFILE IMAGE RESPONSE:", response);

      const updatedUser =
        response?.user ||
        response?.data?.user ||
        response;

      const newImage =
        updatedUser?.profileImage ||
        updatedUser?.profilePicture ||
        response?.profileImage ||
        response?.profilePicture ||
        "";

      if (newImage) {
        setProfileImage(newImage);
      }

      const currentUser = {
        ...storedUser,
        ...(response?.user || {}),
        ...(response?.data?.user || {}),
      };

      if (newImage) {
        currentUser.profileImage = newImage;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(currentUser)
      );

      setStoredUser(currentUser);

      setSuccessMessage(
        "Profile picture updated successfully."
      );

    } catch (error) {
      console.error(
        "PROFILE IMAGE UPLOAD ERROR:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
        "Failed to upload profile picture."
      );

    } finally {
      setUploadingImage(false);

      e.target.value = "";
    }
  };

  // ==========================================
  // Save Profile
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await updateUser(
        storedUser._id || storedUser.id,
        {
          name: formData.name,
          email: formData.email,
        }
      );

      console.log("PROFILE UPDATE RESPONSE:", response);

      const updatedUser =
        response?.user ||
        response?.data?.user ||
        {
          ...storedUser,
          name: formData.name,
          email: formData.email,
        };

      const finalUser = {
        ...storedUser,
        ...updatedUser,
        name: formData.name,
        email: formData.email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(finalUser)
      );

      setStoredUser(finalUser);

      setSuccessMessage(
        "Profile information updated successfully."
      );

    } catch (error) {
      console.error(
        "PROFILE UPDATE ERROR:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
        "Failed to update profile."
      );

    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Profile Initial
  // ==========================================

  const profileInitial = formData.name
    ? formData.name.charAt(0).toUpperCase()
    : "U";

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        px-4
        py-6
        sm:px-6
        md:px-8
        text-white

        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-indigo-950
      "
    >

      {/* ==========================================
          3D BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Blue Glow */}

        <div
          className="
            absolute
            -top-40
            -right-32
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-600/20
            blur-[130px]
          "
        />

        {/* Purple Glow */}

        <div
          className="
            absolute
            bottom-[-200px]
            left-[15%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-purple-600/15
            blur-[130px]
          "
        />

        {/* Cyan Glow */}

        <div
          className="
            absolute
            top-[45%]
            right-[-200px]
            h-[400px]
            w-[400px]
            rounded-full
            bg-cyan-500/10
            blur-[120px]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]

            bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)]

            bg-[size:55px_55px]
          "
        />

        {/* Floating 3D Shape */}

        <div
          className="
            absolute
            top-24
            left-[45%]

            hidden
            xl:block

            h-24
            w-24

            rotate-12

            rounded-3xl

            border
            border-blue-300/10

            bg-blue-400/[0.04]

            shadow-[0_30px_70px_rgba(59,130,246,0.15)]

            backdrop-blur-md
          "
        />

        <div
          className="
            absolute
            bottom-20
            right-[10%]

            hidden
            xl:block

            h-14
            w-14

            -rotate-12

            rounded-2xl

            border
            border-purple-300/10

            bg-purple-400/[0.05]

            shadow-[0_20px_50px_rgba(168,85,247,0.15)]
          "
        />

      </div>


      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div className="relative z-10 mx-auto max-w-6xl">


        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mb-8">

          <div className="flex items-center gap-2">

            <Sparkles
              size={15}
              className="text-cyan-400"
            />

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.22em]
                text-blue-400
              "
            >
              Account Settings
            </p>

          </div>


          <h1
            className="
              mt-3
              text-4xl
              font-black
              tracking-tight

              sm:text-5xl
            "
          >
            Settings
          </h1>


          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-relaxed
              text-slate-400
              sm:text-base
            "
          >
            Manage your profile, account information and
            personal preferences from one place.
          </p>

        </div>


        {/* ========================================
            MAIN 3D CARD
        ======================================== */}

        <div className="relative">


          {/* Back Depth Layer */}

          <div
            className="
              absolute
              inset-x-4
              -bottom-5
              h-full

              rounded-[2rem]

              bg-gradient-to-br
              from-blue-600/10
              to-purple-600/10

              blur-sm
            "
          />


          {/* Main Card */}

          <div
            className="
              relative
              overflow-hidden

              rounded-[2rem]

              border
              border-white/10

              bg-white/[0.055]

              backdrop-blur-2xl

              shadow-[0_35px_100px_rgba(0,0,0,0.45)]
            "
          >

            {/* Top Light */}

            <div
              className="
                absolute
                left-10
                right-10
                top-0
                h-px

                bg-gradient-to-r
                from-transparent
                via-blue-400/60
                to-transparent
              "
            />

            {/* Top Accent */}

            <div
              className="
                absolute
                left-0
                right-0
                top-0
                h-1

                bg-gradient-to-r
                from-blue-500
                via-indigo-500
                to-cyan-400
              "
            />


            {/* ======================================
                CARD HEADER
            ====================================== */}

            <div
              className="
                border-b
                border-white/10

                bg-gradient-to-r
                from-blue-500/[0.08]
                via-transparent
                to-purple-500/[0.06]

                p-6
                sm:p-8
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    relative

                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center

                    rounded-2xl

                    bg-gradient-to-br
                    from-blue-500
                    via-indigo-500
                    to-purple-600

                    border
                    border-white/20

                    shadow-[0_15px_35px_rgba(59,130,246,0.35)]

                    rotate-[-3deg]

                    transition-all
                    duration-300

                    hover:rotate-0
                    hover:scale-105
                  "
                >

                  <UserRound size={25} />

                  <span
                    className="
                      absolute
                      -right-1
                      -top-1

                      h-3
                      w-3

                      rounded-full

                      bg-cyan-400

                      border-2
                      border-slate-900

                      shadow-[0_0_15px_rgba(34,211,238,0.8)]
                    "
                  />

                </div>


                <div>

                  <h2 className="text-xl font-bold">
                    Profile Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Update your personal information.
                  </p>

                </div>

              </div>

            </div>


            {/* ======================================
                MESSAGES
            ====================================== */}

            {successMessage && (

              <div
                className="
                  mx-6
                  mt-6
                  flex
                  items-center
                  gap-3

                  rounded-2xl

                  border
                  border-emerald-400/20

                  bg-emerald-500/10

                  px-4
                  py-3

                  text-sm
                  text-emerald-300

                  shadow-[0_10px_30px_rgba(16,185,129,0.08)]
                "
              >

                <CheckCircle2 size={18} />

                {successMessage}

              </div>

            )}


            {errorMessage && (

              <div
                className="
                  mx-6
                  mt-6
                  flex
                  items-center
                  gap-3

                  rounded-2xl

                  border
                  border-red-400/20

                  bg-red-500/10

                  px-4
                  py-3

                  text-sm
                  text-red-300

                  shadow-[0_10px_30px_rgba(239,68,68,0.08)]
                "
              >

                <AlertCircle size={18} />

                {errorMessage}

              </div>

            )}


            {/* ======================================
                BODY
            ====================================== */}

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8"
            >

              <div
                className="
                  grid
                  grid-cols-1
                  gap-10

                  lg:grid-cols-[200px_1fr]
                "
              >


                {/* ==================================
                    PROFILE AVATAR
                ================================== */}

                <div className="flex flex-col items-center">

                  <div className="relative">


                    {/* Avatar Glow */}

                    <div
                      className="
                        absolute
                        inset-[-12px]

                        rounded-[2rem]

                        bg-blue-500/20

                        blur-2xl
                      "
                    />


                    {/* Hidden Input */}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />


                    {/* Avatar */}

                    {profileImage ? (

                      <img
                        src={profileImage}
                        alt="Profile"
                        className="
                          relative

                          h-36
                          w-36

                          rounded-[2rem]

                          border
                          border-white/20

                          object-cover

                          shadow-[0_25px_60px_rgba(0,0,0,0.45)]
                        "
                      />

                    ) : (

                      <div
                        className="
                          relative

                          flex
                          h-36
                          w-36
                          items-center
                          justify-center

                          rounded-[2rem]

                          bg-gradient-to-br
                          from-blue-500
                          via-indigo-500
                          to-purple-600

                          border
                          border-white/20

                          text-5xl
                          font-black

                          shadow-[0_25px_60px_rgba(0,0,0,0.45)]

                          transition-all
                          duration-300

                          hover:-translate-y-1
                          hover:rotate-1
                        "
                      >

                        {profileInitial}

                      </div>

                    )}


                    {/* Camera */}

                    <button
                      type="button"
                      onClick={handleCameraClick}
                      disabled={uploadingImage}
                      className="
                        absolute
                        -bottom-3
                        -right-3

                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-2xl

                        bg-gradient-to-br
                        from-blue-500
                        to-indigo-600

                        border
                        border-white/20

                        text-white

                        shadow-[0_12px_30px_rgba(59,130,246,0.45)]

                        transition-all
                        duration-300

                        hover:-translate-y-1
                        hover:scale-105

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                      title="Change profile picture"
                    >

                      {uploadingImage ? (

                        <Loader2
                          size={19}
                          className="animate-spin"
                        />

                      ) : (

                        <Camera size={19} />

                      )}

                    </button>

                  </div>


                  <p
                    className="
                      mt-7
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >
                    Profile picture
                  </p>

                  <p
                    className="
                      mt-1
                      text-center
                      text-[11px]
                      text-slate-600
                    "
                  >
                    JPG, PNG or WEBP
                    <br />
                    Maximum 5MB
                  </p>

                </div>


                {/* ==================================
                    FORM FIELDS
                ================================== */}

                <div className="space-y-6">


                  {/* Name */}

                  <div>

                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-slate-200
                      "
                    >
                      Full Name
                    </label>

                    <div className="group relative">

                      <UserRound
                        size={18}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2

                          text-slate-500

                          transition

                          group-focus-within:text-blue-400
                        "
                      />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="
                          w-full

                          rounded-2xl

                          border
                          border-white/10

                          bg-slate-950/50

                          px-4
                          py-4
                          pl-11

                          text-white

                          outline-none

                          placeholder:text-slate-600

                          shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]

                          transition-all
                          duration-300

                          focus:border-blue-500/50
                          focus:bg-slate-950/70
                          focus:ring-4
                          focus:ring-blue-500/10

                          hover:border-white/15
                        "
                        placeholder="Enter your name"
                      />

                    </div>

                  </div>


                  {/* Email */}

                  <div>

                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-slate-200
                      "
                    >
                      Email Address
                    </label>

                    <div className="group relative">

                      <Mail
                        size={18}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2

                          text-slate-500

                          transition

                          group-focus-within:text-blue-400
                        "
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="
                          w-full

                          rounded-2xl

                          border
                          border-white/10

                          bg-slate-950/50

                          px-4
                          py-4
                          pl-11

                          text-white

                          outline-none

                          placeholder:text-slate-600

                          shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]

                          transition-all
                          duration-300

                          focus:border-blue-500/50
                          focus:bg-slate-950/70
                          focus:ring-4
                          focus:ring-blue-500/10

                          hover:border-white/15
                        "
                        placeholder="Enter your email"
                      />

                    </div>

                  </div>


                  {/* ==================================
                      ROLE
                  ================================== */}

                  <div>

                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-slate-200
                      "
                    >
                      Account Role
                    </label>

                    <div
                      className="
                        group

                        flex
                        items-center
                        gap-4

                        rounded-2xl

                        border
                        border-white/10

                        bg-slate-950/40

                        px-4
                        py-4

                        shadow-[inset_0_2px_8px_rgba(0,0,0,0.18)]

                        transition-all
                        duration-300

                        hover:border-blue-500/20
                      "
                    >

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center

                          rounded-xl

                          bg-blue-500/10

                          border
                          border-blue-500/10

                          text-blue-400
                        "
                      >

                        <ShieldCheck size={19} />

                      </div>


                      <div>

                        <p className="text-sm font-semibold text-white">
                          {storedUser.role || "User"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          Your account access level
                        </p>

                      </div>


                      <div className="ml-auto flex items-center gap-2">

                        <span
                          className="
                            rounded-full

                            border
                            border-blue-400/20

                            bg-blue-500/10

                            px-3
                            py-1

                            text-[11px]
                            font-bold

                            text-blue-400
                          "
                        >
                          {storedUser.role || "User"}
                        </span>

                        <ChevronRight
                          size={15}
                          className="
                            text-slate-600
                            transition
                            group-hover:translate-x-1
                            group-hover:text-blue-400
                          "
                        />

                      </div>

                    </div>

                  </div>


                  {/* ==================================
                      SECURITY INFO
                  ================================== */}

                  <div
                    className="
                      flex
                      items-start
                      gap-3

                      rounded-2xl

                      border
                      border-white/5

                      bg-white/[0.025]

                      p-4
                    "
                  >

                    <LockKeyhole
                      size={17}
                      className="
                        mt-0.5
                        shrink-0
                        text-emerald-400
                      "
                    />

                    <div>

                      <p className="text-xs font-semibold text-slate-300">
                        Account protected
                      </p>

                      <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                        Your account is protected with secure
                        authentication and role-based access.
                      </p>

                    </div>

                  </div>


                  {/* ==================================
                      SAVE BUTTON
                  ================================== */}

                  <div className="flex justify-end pt-2">

                    <button
                      type="submit"
                      disabled={saving}
                      className="
                        group

                        relative

                        flex
                        items-center
                        justify-center
                        gap-2

                        overflow-hidden

                        rounded-2xl

                        border
                        border-white/10

                        bg-gradient-to-r
                        from-blue-600
                        via-indigo-600
                        to-purple-600

                        px-7
                        py-3.5

                        font-bold
                        text-white

                        shadow-[0_15px_35px_rgba(59,130,246,0.30)]

                        transition-all
                        duration-300

                        hover:-translate-y-1
                        hover:shadow-[0_20px_45px_rgba(99,102,241,0.40)]

                        active:translate-y-0

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >

                      {/* Button Shine */}

                      <span
                        className="
                          absolute
                          inset-y-0
                          -left-20
                          w-16

                          skew-x-[-20deg]

                          bg-white/20

                          transition-all
                          duration-700

                          group-hover:left-[110%]
                        "
                      />

                      {saving ? (

                        <Loader2
                          size={17}
                          className="animate-spin"
                        />

                      ) : (

                        <Save size={17} />

                      )}

                      <span>
                        {saving
                          ? "Saving..."
                          : "Save Changes"}
                      </span>

                    </button>

                  </div>

                </div>

              </div>

            </form>

          </div>

        </div>


        {/* ========================================
            FOOTER SECURITY
        ======================================== */}

        <div
          className="
            mt-7

            flex
            items-center
            justify-center
            gap-2

            text-xs
            text-slate-600
          "
        >

          <ShieldCheck size={14} />

          Your profile information is securely protected.

        </div>

      </div>

    </div>
  );
}

export default Settings;
