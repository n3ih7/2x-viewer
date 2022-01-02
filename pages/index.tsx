import dynamic from "next/dynamic"

const IndexPage = dynamic(() => import("../components/shell"), { ssr: false })
export default IndexPage