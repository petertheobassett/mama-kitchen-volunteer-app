module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/components/Header.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Header({ autoCollapse = false }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Collapse menu on navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!autoCollapse) return;
        const handleRouteChange = ()=>setOpen(false);
        window.addEventListener('hashchange', handleRouteChange);
        window.addEventListener('popstate', handleRouteChange);
        return ()=>{
            window.removeEventListener('hashchange', handleRouteChange);
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, [
        autoCollapse
    ]);
    const handleToggle = ()=>setOpen((prev)=>!prev);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: headerStyle,
        className: "jsx-231a05369b5d8639",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: stickyWrapper,
                className: "jsx-231a05369b5d8639",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: navBar,
                        className: "jsx-231a05369b5d8639",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleToggle,
                                style: menuButton,
                                "aria-label": "Toggle menu",
                                className: "jsx-231a05369b5d8639",
                                children: open ? '✕' : '☰'
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.js",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: logoText,
                                className: "jsx-231a05369b5d8639",
                                children: "MCMA Kitchen"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.js",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.js",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        style: {
                            ...dropdown,
                            animation: 'fadeIn 0.2s ease-out'
                        },
                        className: "jsx-231a05369b5d8639",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/signup",
                                style: linkStyle,
                                children: "Volunteer Signup"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.js",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/review-signups",
                                style: linkStyle,
                                children: "Review Signups"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.js",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                style: linkStyle,
                                children: "Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.js",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.js",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.js",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "231a05369b5d8639",
                children: "@keyframes fadeIn{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@media (prefers-color-scheme:dark){header.jsx-231a05369b5d8639{background-color:#111!important}nav.jsx-231a05369b5d8639{background-color:#222!important}a.jsx-231a05369b5d8639{color:#eee!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Header.js",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
const headerStyle = {
    backgroundColor: '#000',
    color: '#fff',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 1000
};
const stickyWrapper = {
    padding: '12px 0'
};
const navBar = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
};
const logoText = {
    fontWeight: 600,
    fontSize: '1.2em'
};
const menuButton = {
    fontSize: '1.5em',
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer'
};
const dropdown = {
    marginTop: 12,
    backgroundColor: '#111',
    padding: '12px 0',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10
};
const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 24px',
    fontSize: '0.95em'
};
}}),
"[project]/src/app/admin/review-signups/page.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ReviewSignupsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Header.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ReviewSignupsPage() {
    const [signups, setSignups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [statusMessage, setStatusMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusRow, setStatusRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [removedRows, setRemovedRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [fadingRows, setFadingRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [confirmedRows, setConfirmedRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const fetchSignups = async ()=>{
        try {
            const res = await fetch('/api/signups-overview');
            const data = await res.json();
            if (!Array.isArray(data)) {
                console.error('❌ Invalid API response:', data);
                setStatusRow(null);
                return;
            }
            setSignups(data);
        } catch (err) {
            console.error('❌ Network or parse error:', err);
            setStatusRow(null);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchSignups();
    }, []);
    const handleConfirm = async (vol, row)=>{
        const key = `${vol.name}-${vol.phone}`;
        setStatusRow(row);
        setStatusMessage('⏳ Updating contact info...');
        try {
            const dirRes = await fetch('/api/add-to-directory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: vol.name,
                    phone: vol.phone,
                    email: vol.email
                })
            });
            const dirResult = await dirRes.json();
            const dirMsg = dirResult.phoneUpdated ? `📇 Contact info updated` : dirResult.message || `📇 Already in directory`;
            setStatusMessage(`${dirMsg} – confirming...`);
            const confirmRes = await fetch('/api/confirm-to-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: vol.name,
                    phone: vol.phone,
                    eventName: vol.event,
                    eventDate: vol.eventDate
                })
            });
            const confirmResult = await confirmRes.json();
            const confirmMsg = confirmResult.message || 'Confirmed';
            setStatusMessage(`✅ ${dirMsg} + ${confirmMsg}`);
            setConfirmedRows((prev)=>[
                    ...prev,
                    key
                ]);
            setTimeout(()=>{
                setFadingRows((prev)=>[
                        ...prev,
                        key
                    ]);
            }, 300);
            setTimeout(()=>{
                setRemovedRows((prev)=>[
                        ...prev,
                        key
                    ]);
                setFadingRows((prev)=>prev.filter((k)=>k !== key));
                setStatusRow(null);
                fetchSignups(); // delayed refresh
            }, 700); // animation duration + buffer
        } catch (err) {
            console.error('❌ Confirmation error:', err);
            setStatusMessage('❌ Failed to confirm volunteer.');
            setStatusRow(null);
        }
    };
    function parseYMDToLocal(dateStr) {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    function getWeekdayAbbr(dateStr) {
        const date = parseYMDToLocal(dateStr);
        return isNaN(date) ? '' : date.toLocaleDateString('en-US', {
            weekday: 'short',
            timeZone: 'America/Los_Angeles'
        });
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: loaderWrapper,
            className: "jsx-4766370470659030",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: spinnerStyle,
                    className: "jsx-4766370470659030"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/review-signups/page.js",
                    lineNumber: 110,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    id: "4766370470659030",
                    children: "@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"
                }, void 0, false, void 0, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/review-signups/page.js",
            lineNumber: 109,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                autoCollapse: true
            }, void 0, false, {
                fileName: "[project]/src/app/admin/review-signups/page.js",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: pageWrapper,
                className: "jsx-acc0c712f6e9943f",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            marginBottom: 32
                        },
                        className: "jsx-acc0c712f6e9943f",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "https://mcma.s3.us-east-1.amazonaws.com/mcmaLogo.png",
                                alt: "MCMA Kitchen Logo",
                                style: {
                                    maxWidth: 120,
                                    marginBottom: 12
                                },
                                className: "jsx-acc0c712f6e9943f"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/review-signups/page.js",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: titleStyle,
                                className: "jsx-acc0c712f6e9943f",
                                children: "🧑‍🍳 Review Volunteer Signups"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/review-signups/page.js",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/review-signups/page.js",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    signups.filter((vol)=>!removedRows.includes(`${vol.name}-${vol.phone}`)).map((vol, i)=>{
                        const key = `${vol.name}-${vol.phone}`;
                        const isFading = fadingRows.includes(key);
                        const isConfirmed = confirmedRows.includes(key);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                ...eventCardStyle,
                                position: 'relative'
                            },
                            className: "jsx-acc0c712f6e9943f" + " " + `event-card ${isFading ? 'fade-out' : ''}`,
                            children: [
                                isConfirmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: checkmarkStyle,
                                    className: "jsx-acc0c712f6e9943f",
                                    children: "✅"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/review-signups/page.js",
                                    lineNumber: 151,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 12
                                    },
                                    className: "jsx-acc0c712f6e9943f",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "jsx-acc0c712f6e9943f",
                                            children: vol.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/review-signups/page.js",
                                            lineNumber: 154,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.9em',
                                                marginTop: 6
                                            },
                                            className: "jsx-acc0c712f6e9943f",
                                            children: vol.email
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/review-signups/page.js",
                                            lineNumber: 155,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.9em',
                                                marginTop: 2
                                            },
                                            className: "jsx-acc0c712f6e9943f",
                                            children: [
                                                "📞 ",
                                                vol.phone
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/review-signups/page.js",
                                            lineNumber: 156,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.9em',
                                                marginTop: 6
                                            },
                                            className: "jsx-acc0c712f6e9943f",
                                            children: [
                                                "🗓️ ",
                                                getWeekdayAbbr(vol.eventDate),
                                                " –",
                                                ' ',
                                                parseYMDToLocal(vol.eventDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    timeZone: 'America/Los_Angeles'
                                                }),
                                                ' ',
                                                "– ",
                                                vol.event
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/review-signups/page.js",
                                            lineNumber: 157,
                                            columnNumber: 19
                                        }, this),
                                        vol.rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.9em',
                                                marginTop: 6
                                            },
                                            className: "jsx-acc0c712f6e9943f",
                                            children: [
                                                "⭐ Rating: ",
                                                vol.rating
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/review-signups/page.js",
                                            lineNumber: 168,
                                            columnNumber: 21
                                        }, this),
                                        vol.lastEvent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.9em',
                                                marginTop: 6
                                            },
                                            className: "jsx-acc0c712f6e9943f",
                                            children: [
                                                "🕓 Last: ",
                                                vol.lastEvent,
                                                " (",
                                                new Date(vol.lastDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    timeZone: 'America/Los_Angeles'
                                                }),
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/review-signups/page.js",
                                            lineNumber: 171,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '0.9em',
                                                marginTop: 6
                                            },
                                            className: "jsx-acc0c712f6e9943f",
                                            children: [
                                                "🧍‍♂️ Spots left: ",
                                                vol.spotsLeft
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/review-signups/page.js",
                                            lineNumber: 182,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/review-signups/page.js",
                                    lineNumber: 153,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px'
                                    },
                                    className: "jsx-acc0c712f6e9943f",
                                    children: vol.spotsLeft === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: true,
                                        style: buttonStyle('gray'),
                                        className: "jsx-acc0c712f6e9943f",
                                        children: "❌ Event Full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/review-signups/page.js",
                                        lineNumber: 189,
                                        columnNumber: 21
                                    }, this) : vol.lastEvent === vol.event ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: true,
                                        style: buttonStyle('green'),
                                        className: "jsx-acc0c712f6e9943f",
                                        children: "✅ Volunteer Confirmed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/review-signups/page.js",
                                        lineNumber: 193,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleConfirm(vol, i),
                                        style: buttonStyle('blue'),
                                        className: "jsx-acc0c712f6e9943f",
                                        children: "✅ Confirm to Event"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/review-signups/page.js",
                                        lineNumber: 197,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/review-signups/page.js",
                                    lineNumber: 187,
                                    columnNumber: 17
                                }, this),
                                statusRow === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: inlineToastStyle,
                                    className: "jsx-acc0c712f6e9943f",
                                    children: statusMessage
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/review-signups/page.js",
                                    lineNumber: 203,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, key, true, {
                            fileName: "[project]/src/app/admin/review-signups/page.js",
                            lineNumber: 146,
                            columnNumber: 15
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        id: "acc0c712f6e9943f",
                        children: "body{color:#000;background-color:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif}.event-card{background-color:#fff;border:1px solid #e5e5e5;border-radius:16px;margin-bottom:24px;padding:24px;transition:all .3s;box-shadow:0 8px 30px #0000000d}.fade-out{opacity:0;pointer-events:none;transform:translateY(-10px)}@media (prefers-color-scheme:dark){body{color:#fff;background-color:#121212}.event-card{color:#fff;background-color:#1e1e1e;border-color:#333}}"
                    }, void 0, false, void 0, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/review-signups/page.js",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
const pageWrapper = {
    maxWidth: 720,
    margin: '0 auto',
    padding: 24
};
const titleStyle = {
    textAlign: 'center',
    fontSize: '1.6em',
    fontWeight: 600
};
const eventCardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
    marginBottom: '24px'
};
const buttonStyle = (color)=>({
        backgroundColor: color === 'green' ? '#27ae60' : color === 'blue' ? '#2980b9' : color === 'orange' ? '#f39c12' : '#aaa',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '0.95em',
        border: 'none',
        cursor: color === 'gray' ? 'not-allowed' : 'pointer'
    });
const inlineToastStyle = {
    marginTop: '12px',
    backgroundColor: '#ff0003',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '0.9em',
    textAlign: 'center'
};
const loaderWrapper = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4'
};
const spinnerStyle = {
    width: '36px',
    height: '36px',
    border: '3px solid rgba(0, 0, 0, 0.1)',
    borderTop: '3px solid rgba(0, 0, 0, 0.7)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
};
const checkmarkStyle = {
    position: 'absolute',
    top: 10,
    right: 14,
    fontSize: '1.5em',
    opacity: 1,
    transition: 'opacity 0.3s ease'
};
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__e02d6d2c._.js.map