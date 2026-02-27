import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterSection from "../components/FilterSection";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import AreaChart from "../components/charts/AreaChart";
import { getSales } from "../services/api";

function Dashboard() {

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        category: "",
        status: "",
    });

    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleFilter = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    useEffect(() => {
        const fetchSales = async () => {
            try {
                setLoading(true);
                setError(null);

                const params = {};
                if (filters.startDate) params.startDate = filters.startDate;
                if (filters.endDate) params.endDate = filters.endDate;
                if (filters.category) params.category = filters.category;
                if (filters.status) params.status = filters.status; // already lowercase from FilterSection

                const res = await getSales(params);
                setSales(res.data || []);
            } catch (e) {
                setError("Failed to fetch sales data");
                setSales([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, [filters]);

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">
                <FilterSection onFilter={handleFilter} />

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    {/* Each chart will take half width on medium screens, full width on mobile */}
                    <div className="w-full">
                     <BarChart sales={sales} loading={loading} error={error} />
                    </div>
                    <div className="w-full">
                        <LineChart sales={sales} loading={loading} error={error} />
                    </div>
                    <div className="w-full">
                        <PieChart sales={sales} loading={loading} error={error} />
                    </div>
                    <div className="w-full">
                        <DoughnutChart sales={sales} loading={loading} error={error} />
                    </div>
                    {/* Area Chart Full Width */}
                    <div className="md:col-span-2">
                        <AreaChart sales={sales} loading={loading} error={error} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;