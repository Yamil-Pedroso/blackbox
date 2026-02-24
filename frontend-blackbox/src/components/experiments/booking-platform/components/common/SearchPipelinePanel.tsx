/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  Check,
  Database,
  Globe,
  Layers,
  Loader2,
  X,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    location?: string;
    guests?: number;
    sort?: string;
    page?: number;
    limit?: number;
  };
}

export default function SearchPipelinePanel({
  isOpen,
  onClose,
  filters,
}: Props) {
  const [currentStep, setCurrentStep] = useState(-1);

  const page = Number(filters.page ?? 1);
  const limit = Number(filters.limit ?? 6);
  const skip = (page - 1) * limit;

  // -------------------------
  // Mongo Query Object
  // -------------------------
  const mongoQuery = useMemo(() => {
    const query: any = {};

    if (filters.location?.trim()) {
      query.location = {
        $regex: filters.location,
        $options: "i",
      };
    }

    if (filters.guests && filters.guests > 0) {
      query.maxGuests = { $gte: filters.guests };
    }

    return query;
  }, [filters]);

  // -------------------------
  // Sort Option
  // -------------------------
  const sortOption = useMemo(() => {
    if (filters.sort === "price_asc") return { pricePerNight: 1 };
    if (filters.sort === "price_desc") return { pricePerNight: -1 };
    if (filters.sort === "rating") return { rating: -1 };
    return {};
  }, [filters.sort]);

  // -------------------------
  // HTTP Preview
  // -------------------------
  const httpPreview = useMemo(() => {
    const params = new URLSearchParams();

    if (filters.location) params.append("location", filters.location);

    if (filters.guests) params.append("guests", String(filters.guests));

    if (filters.sort) params.append("sort", filters.sort);

    params.append("page", String(page));
    params.append("limit", String(limit));

    return `GET /api/hotels?${params.toString()}`;
  }, [filters, page, limit]);

  // -------------------------
  // Steps
  // -------------------------
  const steps = useMemo(() => {
    const s: string[] = [];

    s.push("Reading req.query parameters");

    if (filters.location) s.push("Applying $regex operator for location");

    if (filters.guests && filters.guests > 0)
      s.push("Applying $gte operator for maxGuests");

    if (filters.sort) s.push("Constructing sortOption object");

    s.push("Calculating pagination (skip & limit)");
    s.push("Executing Hotel.find(query).sort().skip().limit()");
    s.push("Executing Hotel.countDocuments(query)");
    s.push("Returning JSON response");

    return s;
  }, [filters]);

  // -------------------------
  // Step animation
  // -------------------------
  useEffect(() => {
    if (!isOpen) return;

    setCurrentStep(-1);

    let stepIndex = -1;

    const interval = setInterval(() => {
      stepIndex++;
      setCurrentStep(stepIndex);

      if (stepIndex >= steps.length) {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isOpen, steps.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/*
            BACKDROP (commented for future use)

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          */}

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            className="
              fixed bottom-0 left-0 w-full
              h-[60vh] sm:h-[58vh] md:h-[55vh]
              bg-neutral-950
              border-t border-neutral-800
              z-50
              rounded-t-2xl
              flex flex-col
              shadow-2xl
            "
            /*
              Click outside close disabled intentionally.
              If you want it later, wrap with backdrop + onClick.
            */
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-secondary-bg">
              <div>
                <h2 className="text-primary text-lg font-semibold">
                  Backend Execution Inspector
                </h2>
                <p className="text-neutral-500 text-sm">
                  Live controller reflection
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-primary transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              {/* PIPELINE STEPS */}
              <div>
                <h3 className="text-neutral-400 text-sm mb-4">
                  Pipeline Steps
                </h3>

                <div className="space-y-4">
                  {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className="w-5 h-5 flex items-center justify-center">
                          {isCompleted && (
                            <Check size={16} className="text-green-400" />
                          )}
                          {isActive && (
                            <Loader2
                              size={16}
                              className="text-primary animate-spin"
                            />
                          )}
                        </div>

                        <span
                          className={`${
                            isCompleted
                              ? "text-green-400"
                              : isActive
                                ? "text-primary"
                                : "text-neutral-600"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MONGO QUERY */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-neutral-400 text-sm">
                    Mongo Query Object
                  </h3>
                  <Database size={28} className="text-emerald-400" />
                </div>

                <pre className="text-blue-400 text-xs bg-neutral-900 p-4 rounded overflow-auto">
                  {JSON.stringify(mongoQuery, null, 2)}
                </pre>
              </div>

              {/* SORT OPTION */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-neutral-400 text-sm">Sort Option</h3>
                  <ArrowUpDown size={28} className="text-yellow-400" />
                </div>

                <pre className="text-blue-400 text-xs bg-neutral-900 p-4 rounded overflow-auto">
                  {JSON.stringify(sortOption, null, 2)}
                </pre>
              </div>

              {/* PAGINATION */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-neutral-400 text-sm">Pagination</h3>
                  <Layers size={28} className="text-purple-400" />
                </div>

                <pre className="text-blue-400 text-xs bg-neutral-900 p-4 rounded">
                  {`{
  page: ${page},
  limit: ${limit},
  skip: ${skip}
}`}
                </pre>
              </div>

              {/* HTTP PREVIEW */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-neutral-400 text-sm">
                    HTTP Request Preview
                  </h3>
                  <Globe size={28} className="text-cyan-400" />
                </div>

                <pre className="text-green-400 text-xs bg-neutral-900 p-4 rounded break-all">
                  {httpPreview}
                </pre>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
