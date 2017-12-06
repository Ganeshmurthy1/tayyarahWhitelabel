!function(window,angular,undefined){"use strict";function $SanitizeProvider(){this.$get=["$$sanitizeUri",function($$sanitizeUri){return function(html){var buf=[];return htmlParser(html,htmlSanitizeWriter(buf,function(uri,isImage){return!/^unsafe/.test($$sanitizeUri(uri,isImage))})),buf.join("")}}]}function sanitizeText(chars){var buf=[],writer=htmlSanitizeWriter(buf,angular.noop);return writer.chars(chars),buf.join("")}function makeMap(str,lowercaseKeys){var i,obj={},items=str.split(",");for(i=0;i<items.length;i++)obj[lowercaseKeys?angular.lowercase(items[i]):items[i]]=!0;return obj}function htmlParser(html,handler){function parseStartTag(tag,tagName,rest,unary){if(tagName=angular.lowercase(tagName),blockElements[tagName])for(;stack.last()&&inlineElements[stack.last()];)parseEndTag("",stack.last());optionalEndTagElements[tagName]&&stack.last()==tagName&&parseEndTag("",tagName),unary=voidElements[tagName]||!!unary,unary||stack.push(tagName);var attrs={};rest.replace(ATTR_REGEXP,function(match,name,doubleQuotedValue,singleQuotedValue,unquotedValue){var value=doubleQuotedValue||singleQuotedValue||unquotedValue||"";attrs[name]=decodeEntities(value)}),handler.start&&handler.start(tagName,attrs,unary)}function parseEndTag(tag,tagName){var i,pos=0;if(tagName=angular.lowercase(tagName))for(pos=stack.length-1;pos>=0&&stack[pos]!=tagName;pos--);if(pos>=0){for(i=stack.length-1;i>=pos;i--)handler.end&&handler.end(stack[i]);stack.length=pos}}"string"!=typeof html&&(html=null===html||"undefined"==typeof html?"":""+html);var index,chars,match,text,stack=[],last=html;for(stack.last=function(){return stack[stack.length-1]};html;){if(text="",chars=!0,stack.last()&&specialElements[stack.last()]?(html=html.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*"+stack.last()+"[^>]*>","i"),function(all,text){return text=text.replace(COMMENT_REGEXP,"$1").replace(CDATA_REGEXP,"$1"),handler.chars&&handler.chars(decodeEntities(text)),""}),parseEndTag("",stack.last())):(0===html.indexOf("<!--")?(index=html.indexOf("--",4),index>=0&&html.lastIndexOf("-->",index)===index&&(handler.comment&&handler.comment(html.substring(4,index)),html=html.substring(index+3),chars=!1)):DOCTYPE_REGEXP.test(html)?(match=html.match(DOCTYPE_REGEXP),match&&(html=html.replace(match[0],""),chars=!1)):BEGING_END_TAGE_REGEXP.test(html)?(match=html.match(END_TAG_REGEXP),match&&(html=html.substring(match[0].length),match[0].replace(END_TAG_REGEXP,parseEndTag),chars=!1)):BEGIN_TAG_REGEXP.test(html)&&(match=html.match(START_TAG_REGEXP),match?(match[4]&&(html=html.substring(match[0].length),match[0].replace(START_TAG_REGEXP,parseStartTag)),chars=!1):(text+="<",html=html.substring(1))),chars&&(index=html.indexOf("<"),text+=0>index?html:html.substring(0,index),html=0>index?"":html.substring(index),handler.chars&&handler.chars(decodeEntities(text)))),html==last)throw $sanitizeMinErr("badparse","The sanitizer was unable to parse the following block of html: {0}",html);last=html}parseEndTag()}function decodeEntities(value){return value?(hiddenPre.innerHTML=value.replace(/</g,"&lt;"),hiddenPre.textContent):""}function encodeEntities(value){return value.replace(/&/g,"&amp;").replace(SURROGATE_PAIR_REGEXP,function(value){var hi=value.charCodeAt(0),low=value.charCodeAt(1);return"&#"+(1024*(hi-55296)+(low-56320)+65536)+";"}).replace(NON_ALPHANUMERIC_REGEXP,function(value){return"&#"+value.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function htmlSanitizeWriter(buf,uriValidator){var ignore=!1,out=angular.bind(buf,buf.push);return{start:function(tag,attrs,unary){tag=angular.lowercase(tag),!ignore&&specialElements[tag]&&(ignore=tag),ignore||validElements[tag]!==!0||(out("<"),out(tag),angular.forEach(attrs,function(value,key){var lkey=angular.lowercase(key),isImage="img"===tag&&"src"===lkey||"background"===lkey;validAttrs[lkey]!==!0||uriAttrs[lkey]===!0&&!uriValidator(value,isImage)||(out(" "),out(key),out('="'),out(encodeEntities(value)),out('"'))}),out(unary?"/>":">"))},end:function(tag){tag=angular.lowercase(tag),ignore||validElements[tag]!==!0||(out("</"),out(tag),out(">")),tag==ignore&&(ignore=!1)},chars:function(chars){ignore||out(encodeEntities(chars))}}}var $sanitizeMinErr=angular.$$minErr("$sanitize"),START_TAG_REGEXP=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,END_TAG_REGEXP=/^<\/\s*([\w:-]+)[^>]*>/,ATTR_REGEXP=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,BEGIN_TAG_REGEXP=/^</,BEGING_END_TAGE_REGEXP=/^<\//,COMMENT_REGEXP=/<!--(.*?)-->/g,DOCTYPE_REGEXP=/<!DOCTYPE([^>]*?)>/i,CDATA_REGEXP=/<!\[CDATA\[(.*?)]]>/g,SURROGATE_PAIR_REGEXP=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,NON_ALPHANUMERIC_REGEXP=/([^\#-~| |!])/g,voidElements=makeMap("area,br,col,hr,img,wbr"),optionalEndTagBlockElements=makeMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),optionalEndTagInlineElements=makeMap("rp,rt"),optionalEndTagElements=angular.extend({},optionalEndTagInlineElements,optionalEndTagBlockElements),blockElements=angular.extend({},optionalEndTagBlockElements,makeMap("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),inlineElements=angular.extend({},optionalEndTagInlineElements,makeMap("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),svgElements=makeMap("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use"),specialElements=makeMap("script,style"),validElements=angular.extend({},voidElements,blockElements,inlineElements,optionalEndTagElements,svgElements),uriAttrs=makeMap("background,cite,href,longdesc,src,usemap,xlink:href"),htmlAttrs=makeMap("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),svgAttrs=makeMap("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",!0),validAttrs=angular.extend({},uriAttrs,svgAttrs,htmlAttrs),hiddenPre=document.createElement("pre");angular.module("ngSanitize",[]).provider("$sanitize",$SanitizeProvider),angular.module("ngSanitize").filter("linky",["$sanitize",function($sanitize){var LINKY_URL_REGEXP=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"â€â€™]/i,MAILTO_REGEXP=/^mailto:/i;return function(text,target){function addText(text){text&&html.push(sanitizeText(text))}function addLink(url,text){html.push("<a "),angular.isDefined(target)&&html.push('target="',target,'" '),html.push('href="',url.replace(/"/g,"&quot;"),'">'),addText(text),html.push("</a>")}if(!text)return text;for(var match,url,i,raw=text,html=[];match=raw.match(LINKY_URL_REGEXP);)url=match[0],match[2]||match[4]||(url=(match[3]?"http://":"mailto:")+url),i=match.index,addText(raw.substr(0,i)),addLink(url,match[0].replace(MAILTO_REGEXP,"")),raw=raw.substring(i+match[0].length);return addText(raw),$sanitize(html.join(""))}}])}(window,window.angular);