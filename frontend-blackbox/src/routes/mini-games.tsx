import { createFileRoute } from "@tanstack/react-router";
import MiniGamesPage from "../pages/MiniGamesPage";

export const Route = createFileRoute("/mini-games")({
  component: MiniGamesPage,
});
