import {create} from "zustand/index";
import _ from "lodash";
import toast from "react-hot-toast";

type EmployeeStore = {
  employees: Employee[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  params: {[key: string]: string};
  filterEmployees: (params: {[key: string]: string}) => Promise<void>;
  createEmployee: (category: {email: string, password: string}) => Promise<boolean>;
  clearEmployees: () => void;
  setPage: () => void;
  clearParams: () => void;
  setParams: (params: {[key: string]: string}) => void;
};

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  loading: false,
  hasMore: true,
  page: 1,
  params: {
    size: "20"
  },
  filterEmployees: async (params: {[key: string]: string}) => {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`/api/employee?${searchParams}`);
    const { employees } = await res.json();
    const size= parseInt(params["size"] || "20");
    if(_.isEmpty(params["page"]) || params["page"] === "1") {
      set({employees, hasMore: employees.length === size, page: 1, params: {size: "20"}});
      return;
    }
    set((state) => ({employees: [...state.employees, ...employees], hasMore: employees.length === size}));
  },
  createEmployee: async (formData: {email: string, password: string}) => {
    set({loading: true})
    try {
      const res = await fetch(`/api/employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const {employee, message} = await res.json();

      if (!res.ok) throw new Error(message);

      // Thêm vào state hoặc gọi lại getCategories()
      set((state) => ({
        employees: [...state.employees, employee],
        loading: false,
      }));
      toast.success(message)
      return true;
    } catch (err) {
      set({loading: false})
      toast.error((err as Error).message);
      return false;
    }
  },
  clearEmployees: () => set({employees: [], hasMore: true}),
  setPage: () => set((state)=> ({ page: state.page + 1 })),
  setParams: (params: {[key: string]: string}) => set({params}),
  clearParams: () => set({params: {
    size: "20"
  }})
}))