import { type RouteConfig, index, route} from "@react-router/dev/routes";

export default [index("routes/home.tsx"), 
                route("welcome", "welcome/welcome.tsx"),
                route("homepage", "pages/homepage.tsx"),
                route("lægetyper", "pages/doctortypes.tsx"),
                route("vagttyper", "pages/shifts.tsx"),
                route("minelæger", "pages/mydoctors.tsx")
            ] satisfies RouteConfig;
