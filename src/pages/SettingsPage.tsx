import { Link } from "react-router";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BiCopyright, BiReset } from "react-icons/bi";
import {
  ModalDivider,
  SettingsNumberInput,
  SettingsSelectOption,
  SlideButton,
  ModalItem,
} from "@/components";
import { ScoreContext } from "@/hooks";
import { useContext } from "react";
import { Team } from "@/types";

export const SettingsPage = () => {
  const { reset, set, scores } = useContext(ScoreContext);

  const handleSet = (val: number, name: Team) => val < 100 && set(name, val);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
      <Link to={"/"} className="w-screen h-screen backdrop-blur-md block" />
      <article className="rounded-xl border-2 border-slate-700 bg-slate-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 flex flex-col justify-between">
        <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
          <div className="w-full">
            <header>
              <h3 className="font-medium text-lg sm:text-xl mb-1">
                <span className="hover:underline"> Control Panel</span>
              </h3>
              <p className="line-clamp-2 text-sm text-gray-200">
                Main App Settings for better experience
              </p>
            </header>
            <ModalDivider />
            <ModalItem title="Theme" disabled />
            <ModalDivider />
            <ModalItem title="Score">
              <h5 className="mb-2 text-sm">Set Score</h5>
              <div className="lg:justify-start mb-3 flex justify-between gap-x-1 mt-2">
                <SettingsNumberInput
                  value={scores.A}
                  onChange={(e) => handleSet(Number(e.target.value), "A")}
                />
                <SettingsNumberInput
                  value={scores.B}
                  onChange={(e) => handleSet(Number(e.target.value), "B")}
                />
              </div>
              <h5 className="mb-2 text-sm">Per Step</h5>
              <div>
                <select
                  name="step"
                  defaultValue={scores.step}
                  className="border px-2 py-1 rounded-md font-light mb-2  "
                  onChange={(e) => handleSet(Number(e.target.value), "step")}
                >
                  <SettingsSelectOption value={1} />
                  <SettingsSelectOption value={2} />
                  <SettingsSelectOption value={3} />
                  <SettingsSelectOption value={5} />
                  <SettingsSelectOption value={10} />
                  <SettingsSelectOption value={20} />
                </select>
              </div>
              <h5 className="mb-2 text-sm">Reset Score</h5>
              <div className="justify-start mb-3 flex gap-x-1 mt-2">
                <button
                  onClick={reset}
                  className="border border-red-500 px-2 py-1 rounded-md hover:bg-red-500 text-red-500 text-xs font-light hover:text-red-200 transition-colors"
                >
                  <BiReset className="inline mb-1" /> Reset current Score
                </button>
                {/* <button className="px-2 py-1 rounded-md hover:bg-green-400 bg-green-700 text-xs font-light hover:text-green-900 transition-colors ">
                  <VscSaveAll className="inline mb-1" /> Save
                </button> */}
              </div>
            </ModalItem>
          </div>
        </div>

        <div className="flex justify-between">
          <Link to={"/"} className="flex justify-start">
            <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-es-xl rounded-se-xl bg-green-600 px-3 py-1.5 text-white text-xs">
              Copyright 2025 <BiCopyright /> MYSC App
            </strong>
          </Link>
          <Link to={"/"} className="flex justify-end">
            <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-red-600 px-3 py-1.5 text-white">
              <IoCloseCircleOutline />
              {/* <span className="text-[10px] font-medium sm:text-xs">Close</span> */}
            </strong>
          </Link>
        </div>
      </article>
      <SlideButton target="/" className="bg-red-600 px-3 py-1.5 text-white">
        <IoCloseCircleOutline />
      </SlideButton>
    </div>
  );
};
