import React, { useEffect, useState } from "react";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import axios, { Axios } from "axios";
import FormModal from "./FormModal";
import EntryCard from "./EntryCard";
import { useCredContext } from "../context/Credentials";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";


export const Example = () => {
  return (
    <div className="flex bg-indigo-50">
      <Sidebar />
      <ExampleContent />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={CgProfile}
          title="Profile"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={LuLogOut}
          title="Logout"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">TomIsLoading</span>
              <span className="block text-xs text-slate-500">Pro Plan</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const ExampleContent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const { credentials } = useCredContext();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterEntriesByDate();
  }, [data, selectedDate]);

  const fetchData = async () => {
    try {
      const authHeader = `Basic ${localStorage.getItem('AUTH_KEY')}`;
      console.log(authHeader);
      const response = await axios.get('http://localhost:8080/journal', {
        headers: {
          Authorization: authHeader,
        },
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterEntriesByDate = () => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const filtered = data.filter((entry) => entry.date.startsWith(formattedDate));
    setFilteredData(filtered);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  return (
    <div className="h-[100vh] w-full p-10 bg-[#f2f2f3]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{selectedDate.toDateString()}</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateDate(-1)}
            className="bg-secondary text-white px-4 py-2 rounded shadow hover:bg-red-500"
          >
            &lt; Previous
          </button>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="border px-4 py-2 rounded shadow"
          />
          <button
            onClick={() => navigateDate(1)}
            className="bg-secondary text-white px-4 py-2 rounded shadow hover:bg-red-500"
          >
            Next &gt;
          </button>
        </div>
      </div>

      <div className="w-[90%] flex flex-wrap gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((entry) => (
            
            <EntryCard
              key={entry.id}
              id = {entry.id}
              title={entry.title}
              content={entry.content}
              date={entry.date}
              sentiment={entry.sentiment}
            />
          ))
        ) : (
          <p className="text-xl text-gray-500">No Journal entries for this day</p>
        )}
        <div
          onClick={() => setShowModal(true)}
          className="flex flex-col justify-center items-center w-[22%] h-[300px] shadow-md bg-white p-4 pb-6 gap-4 rounded-lg hover:cursor-pointer"
        >
          <FaPlusCircle className="text-[4rem]" />
        </div>
      </div>
      {showModal && <FormModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default ExampleContent;
