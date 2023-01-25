import React from "react";
import { RouterX } from "../src";

const router = RouterX(
	{
		HOMEPAGE: "/",
		ACTIVATION: "/user?usedId?bla",
		LOGIN: "/login",
		SIGNUP: "/signup",
		APP: "/app",
		"APP.CAMPAIGNS": "/campaigns",
		"APP.CAMPAIGNS.NEW": "/new",
		"APP.CAMPAIGNS.EDIT": "/:id",
	},
	"HOMEPAGE",
	{},
);

// @ts-ignore
window.router = router;

export const World = () => {
	return <div>example</div>;
};
