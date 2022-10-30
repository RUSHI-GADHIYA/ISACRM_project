import { Tab } from "@headlessui/react";
import AdvisorTable from "./AdvisorTable";
import CategoryTab from "./CategoryTab";
import ImportDataPage from "./ImportData";
import ProgramTab from "./ProgramTab";

// DOCS for @headlessui/react package on "https://headlessui.dev/react/tabs"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Test() {
  return (
    <div className="px-12 flex flex-col grow">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="flex space-x-1 rounded bg-stone-300 p-1">
          <Tab
            key={0}
            className={({ selected }) =>
              classNames(
                "w-full rounded py-2.5 text-sm font-medium leading-5 text-black",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ",
                selected
                  ? "bg-stone-100 shadow"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-neutral-800"
              )
            }
          >
            Manage Advisors
          </Tab>

          <Tab
            key={1}
            className={({ selected }) =>
              classNames(
                "w-full rounded py-2.5 text-sm font-medium leading-5 text-black",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ",
                selected
                  ? "bg-stone-100 shadow"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-neutral-800"
              )
            }
          >
            Manage Categories
          </Tab>

          <Tab
            key={2}
            className={({ selected }) =>
              classNames(
                "w-full rounded py-2.5 text-sm font-medium leading-5 text-black",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ",
                selected
                  ? "bg-stone-100 shadow"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-neutral-800"
              )
            }
          >
            Manage Programs
          </Tab>
          <Tab
            key={3}
            className={({ selected }) =>
              classNames(
                "w-full rounded py-2.5 text-sm font-medium leading-5 text-black",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ",
                selected
                  ? "bg-stone-100 shadow"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-neutral-800"
              )
            }
          >
            Manage Data Dumps
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-2">
          <Tab.Panel key={0}>
            {/* advisor's list component */}
            <AdvisorTable></AdvisorTable>
          </Tab.Panel>

          <Tab.Panel key={1}>
            {/* category component */}
            <CategoryTab></CategoryTab>
          </Tab.Panel>

          <Tab.Panel key={2}>
            <ProgramTab />
          </Tab.Panel>

          <Tab.Panel key={3}>
            <ImportDataPage />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
