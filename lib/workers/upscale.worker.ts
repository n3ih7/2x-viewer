import { createWorkerFactory } from "@shopify/react-web-worker";

const upscaleWorker = createWorkerFactory(() => import("../instances/i-upscaler"))
export default upscaleWorker