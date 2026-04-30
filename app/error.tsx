"use client";
import { Metadata } from "next";
import InternalServerErrorClient from "./InternalServerErrorClient";

export const metadata: Metadata = {
    title: "500 - Server Error | Prabodhika",
    description: "Something went wrong on our end. Please try again later or report the issue if it persists.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function InternalServerError() {
    return <InternalServerErrorClient />;
}