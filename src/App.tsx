import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { History } from "@/pages/History";
import { Worship } from "@/pages/Worship";
import { Ministries } from "@/pages/Ministries";
import { NewsEvents } from "@/pages/NewsEvents";
import { Serve } from "@/pages/Serve";
import { Give } from "@/pages/Give";
import { FAQ } from "@/pages/FAQ";
import { NotFound } from "@/pages/NotFound";

/**
 * HashRouter is intentional: this SPA ships as a single static
 * dist/index.html with no server-side rewrites, so deep links like
 * /#/worship must resolve without host fallback configuration.
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
          <Route path="/worship" element={<Worship />} />
          <Route path="/mass-times" element={<Worship />} />
          <Route path="/hours-location" element={<Worship />} />
          <Route path="/visit" element={<Worship />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/ministry" element={<Ministries />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/news-and-events" element={<NewsEvents />} />
          <Route path="/serve" element={<Serve />} />
          <Route path="/volunteer" element={<Serve />} />
          <Route path="/give" element={<Give />} />
          <Route path="/donate" element={<Give />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
