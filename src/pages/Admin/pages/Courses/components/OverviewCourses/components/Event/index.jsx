// hook
import { useNavigate } from "react-router-dom";

// react router dom
import { Link } from "react-router-dom";

// props validation
import PropTypes from "prop-types";

const Event = ({
  id,
  t,
  s,
  e,
  typeEvent,
  selectedCourses,
  setSelectedCourses,
}) => {
  const navigate = useNavigate();

  // Handle individual checkbox change
  const handleSelectCourse = (id) => {
    setSelectedCourses((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id],
    }));
  };

  // Handle click to navigate
  const handleClickNavigate = () => {
    navigate(`/admin/courses/edit/${id}`);
  };

  // format dates
  const formatDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatHour = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`${typeEvent === "Lutte" ? "border-blue-500" : typeEvent === "Grappling" ? "border-[#b0181c]" : "border-yellow-500"} ${window.innerWidth >= 768 ? "cursor-pointer hover:bg-slate-50" : ""} flex items-center justify-between gap-x-5 border-b border-l-4 border-b-gray-400 py-3 pl-4 pr-7 last:rounded-es-md last:border-b-0 md:py-4 md:pr-8`}
      onClick={window.innerWidth >= 768 ? handleClickNavigate : undefined}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-x-5 md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-3.5 cursor-pointer"
              checked={selectedCourses[id] || false}
              onClick={(e) => e.stopPropagation()}
              onChange={() => handleSelectCourse(id)}
            />
          </div>

          <div className="flex flex-col md:hidden">
            <span className="mb-2 min-w-[84px] font-bold">{t}</span>

            <div className="flex flex-col text-gray-600">
              <span className="min-w-[102px]">
                De <strong>{formatHour(s)}</strong> le{" "}
                <strong>{formatDate(s)}</strong>
              </span>

              <span className="min-w-[102px]">
                à <strong>{formatHour(e)}</strong> le{" "}
                <strong>{formatDate(e)}</strong>
              </span>
            </div>
          </div>

          {/* <div className="hidden md:flex md:flex-1 md:justify-between"> */}
          <span className="hidden md:flex md:min-w-[84px]">{t}</span>

          <span className="hidden md:flex md:min-w-[102px]">
            {formatHour(s)} le {formatDate(s)}
          </span>

          <span className="hidden md:flex md:min-w-[102px]">
            {formatHour(e)} le {formatDate(e)}
          </span>
          {/* </div> */}
        </div>

        <div className="md:hidden">
          <Link to={`/admin/courses/edit/${id}`}>
            <i className="fa-solid fa-pen rounded-full p-2 text-gray-600 transition-colors hover:bg-sky-100"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

Event.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.string.isRequired,
  s: PropTypes.string.isRequired,
  e: PropTypes.string.isRequired,
  typeEvent: PropTypes.string.isRequired,
  selectedCourses: PropTypes.object.isRequired,
  setSelectedCourses: PropTypes.func.isRequired,
};

export default Event;
