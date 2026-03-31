/** 用于图形操作的 的公共方法*/
import html2canvas from 'html2canvas';

const exportWrapDomId = 'yss-data-export-canvas-id';
const removeCssList = ['boxShadow'];

function cloneCanvas(
  oldCanvas: HTMLCanvasElement,
  newCanvas: HTMLCanvasElement,
): HTMLCanvasElement {
  const context: CanvasRenderingContext2D | null = newCanvas.getContext('2d');

  if (context) {
    context.drawImage(oldCanvas, 0, 0);
  }

  return newCanvas;
}

function replaceCanvas(targetDom: HTMLElement, newNode: Element): Node {
  const validCanvasDomArr = targetDom.getElementsByTagName('canvas');
  const invalidCanvasDomArr = newNode.getElementsByTagName('canvas');
  if (validCanvasDomArr.length < 1) {
    return newNode;
  }
  for (let i = validCanvasDomArr.length - 1; i >= 0; i--) {
    const validCanvasDom = validCanvasDomArr[i];
    const invalidCanvasDom = invalidCanvasDomArr[i];
    cloneCanvas(validCanvasDom, invalidCanvasDom);
  }

  return newNode;
}

function cloneDom(domId: string): Node | null {
  const dom: HTMLElement | null = document.querySelector(`#${domId}`);
  if (dom) {
    const cloneNode: Element = document.importNode(dom, true);

    return replaceCanvas(dom, cloneNode);
  } else {
    return null;
  }
}

function removeCSS(node: HTMLElement, cssNames: string[] = []) {
  if (!node) {
    return;
  }

  const { style } = node;
  for (const cssName of cssNames) {
    // @ts-ignore
    style[cssName] = 'none';
  }

  const { children = [] } = node;
  // @ts-ignore
  for (const child of children) {
    removeCSS(child as HTMLElement, cssNames);
  }
}

/** 截图, 将指定dom元素截图并返回base64 */
export const screenShotImage = async (domId: string) => {
  const dom = cloneDom(domId);
  const targetElement: HTMLElement | null = document.querySelector(`#${domId}`);

  if (dom && targetElement) {
    const width = targetElement.offsetWidth;
    const height = targetElement.offsetHeight;
    const wrap = document.createElement('div');
    wrap.style.position = 'absolute';
    wrap.style.left = '-10000px';
    wrap.style.top = '-10000px';
    wrap.style.width = `${width}px`;
    wrap.style.height = `${height}px`;
    wrap.id = exportWrapDomId;
    wrap.appendChild(dom);
    document.body.appendChild(wrap);
    const targetDom = document.getElementById(exportWrapDomId);
    if (targetDom) {
      removeCSS(targetDom, removeCssList);
      return await new Promise((resolve: (imageSrc: string) => void) => {
        html2canvas(targetDom).then((canvas: HTMLCanvasElement) => {
          document.body.removeChild(wrap);
          return resolve(canvas.toDataURL('image/png'));
        });
      });
    }
  } else {
    return '';
  }
};
