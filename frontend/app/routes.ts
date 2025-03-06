import { type RouteConfig, index, route} from "@react-router/dev/routes";

export default [index("routes/home.tsx"), 
                route("welcome", "welcome/welcome.tsx"),
                route("homepage", "pages/homepage.tsx")
            ] satisfies RouteConfig;
