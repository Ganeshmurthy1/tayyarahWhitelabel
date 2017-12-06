!function(){"use strict";angular.module("ui-rangeSlider",[]).directive("rangeSlider",["$document","$filter","$log",function(e,n,a){var l=window.PointerEvent?1:window.MSPointerEvent?2:"ontouchend"in document?3:4,i=".rangeSlider",t={disabled:!1,orientation:"horizontal",step:0,decimalPlaces:0,showValues:!0,preventEqualMinMax:!1,attachHandleValues:!1},s=(1===l?"pointerdown":2===l?"MSPointerDown":3===l?"touchstart":"mousedown")+i,o=(1===l?"pointermove":2===l?"MSPointerMove":3===l?"touchmove":"mousemove")+i,d=(1===l?"pointerup":2===l?"MSPointerUp":3===l?"touchend":"mouseup")+i,r=function(e){try{return[e.clientX||e.originalEvent.clientX||e.originalEvent.touches[0].clientX,e.clientY||e.originalEvent.clientY||e.originalEvent.touches[0].clientY]}catch(n){return["x","y"]}},u=function(e){return 0>e?0:e>100?100:e},m=function(e){return!isNaN(parseFloat(e))&&isFinite(e)};return 4>l?angular.element("html").addClass("ngrs-touch"):angular.element("html").addClass("ngrs-no-touch"),{restrict:"A",replace:!0,template:['<div class="ngrs-range-slider">','<div class="ngrs-runner">','<div class="ngrs-handle ngrs-handle-min"><i></i></div>','<div class="ngrs-handle ngrs-handle-max"><i></i></div>','<div class="ngrs-join"></div>',"</div>",'<div class="ngrs-value-runner">','<div class="ngrs-value ngrs-value-min" ng-show="showValues"><div>{{filteredModelMin}}</div></div>','<div class="ngrs-value ngrs-value-max" ng-show="showValues"><div>{{filteredModelMax}}</div></div>',"</div>","</div>"].join(""),scope:{disabled:"=?",min:"=",max:"=",modelMin:"=?",modelMax:"=?",onHandleDown:"&",onHandleUp:"&",orientation:"@",step:"@",decimalPlaces:"@",filter:"@",filterOptions:"@",showValues:"@",pinHandle:"@",preventEqualMinMax:"@",attachHandleValues:"@"},link:function(l,c,g){function f(e){"min"===e?(angular.element(H[0]).css("display","none"),angular.element(H[1]).css("display","block")):"max"===e?(angular.element(H[0]).css("display","block"),angular.element(H[1]).css("display","none")):(angular.element(H[0]).css("display","block"),angular.element(H[1]).css("display","block"))}function M(e){e?w.addClass("disabled"):w.removeClass("disabled")}function v(){l.min>l.max&&p("min must be less than or equal to max"),angular.isDefined(l.min)&&angular.isDefined(l.max)&&(m(l.min)||p("min must be a number"),m(l.max)||p("max must be a number"),C=l.max-l.min,q=[l.min,l.max],h())}function h(){if(l.modelMin>l.modelMax&&(b("modelMin must be less than or equal to modelMax"),l.modelMin=l.modelMax),(angular.isDefined(l.modelMin)||"min"===l.pinHandle)&&(angular.isDefined(l.modelMax)||"max"===l.pinHandle)){m(l.modelMin)||("min"!==l.pinHandle&&b("modelMin must be a number"),l.modelMin=l.min),m(l.modelMax)||("max"!==l.pinHandle&&b("modelMax must be a number"),l.modelMax=l.max);var e=u((l.modelMin-l.min)/C*100),a=u((l.modelMax-l.min)/C*100);if(l.attachHandleValues)var i=e,t=a;l.modelMin=Math.max(l.min,l.modelMin),l.modelMax=Math.min(l.max,l.modelMax),l.filter?(l.filteredModelMin=n(l.filter)(l.modelMin,l.filterOptions),l.filteredModelMax=n(l.filter)(l.modelMax,l.filterOptions)):(l.filteredModelMin=l.modelMin,l.filteredModelMax=l.modelMax),l.min===l.max&&l.modelMin==l.modelMax?(angular.element(H[0]).css(D,"0%"),angular.element(H[1]).css(D,"100%"),l.attachHandleValues&&(angular.element(".ngrs-value-runner").addClass("ngrs-attached-handles"),angular.element($[0]).css(D,"0%"),angular.element($[1]).css(D,"100%")),angular.element(V).css(D,"0%").css(y,"0%")):(angular.element(H[0]).css(D,e+"%"),angular.element(H[1]).css(D,a+"%"),l.attachHandleValues&&(angular.element(".ngrs-value-runner").addClass("ngrs-attached-handles"),angular.element($[0]).css(D,i+"%"),angular.element($[1]).css(D,t+"%"),angular.element($[1]).css(y,"auto")),angular.element(V).css(D,e+"%").css(y,100-a+"%"),e>95&&angular.element(H[0]).css("z-index",3))}}function x(n){var a=H[n];a.bind(s+"X",function(t){var s=(0===n?"ngrs-handle-min":"ngrs-handle-max")+"-down",m=a.add(e).add("body"),c=(0===n?l.modelMin:l.modelMax)-l.min,g=c/C*100,f=r(t),M=f,v=!1;angular.isFunction(l.onHandleDown)&&l.onHandleDown(),angular.element("body").bind("selectstart"+i,function(){return!1}),l.disabled||(a.addClass("ngrs-down"),w.addClass("ngrs-focus "+s),angular.element("body").addClass("ngrs-touching"),e.bind(o,function(e){e.preventDefault();var i,t,s=r(e),o=l.step/C*100,d=((0===n?l.modelMax:l.modelMin)-l.min)/C*100;"x"!==s[0]&&(s[0]-=f[0],s[1]-=f[1],i=[M[0]!==s[0],M[1]!==s[1]],t=g+100*s[E]/(E?w.height():w.width()),t=u(t),l.preventEqualMinMax&&(0===o&&(o=1/C*100),0===n?d-=o:1===n&&(d+=o)),0===n?t=t>d?d:t:1===n&&(t=d>t?d:t),l.step>0&&100>t&&t>0&&(t=Math.round(t/o)*o),t>95&&0===n?a.css("z-index",3):a.css("z-index",""),i[E]&&t!=v&&(0===n?l.modelMin=parseFloat(t*C/100+l.min).toFixed(l.decimalPlaces):1===n&&(l.modelMax=parseFloat(t*C/100+l.min).toFixed(l.decimalPlaces)),l.$apply(),v=t),M=s)}).bind(d,function(){angular.isFunction(l.onHandleUp)&&l.onHandleUp(),m.off(i),angular.element("body").removeClass("ngrs-touching"),a.removeClass("ngrs-down"),w.removeClass("ngrs-focus "+s)}))})}function p(e){throw l.disabled=!0,new Error("RangeSlider: "+e)}function b(e){a.warn(e)}var w=angular.element(c),H=[c.find(".ngrs-handle-min"),c.find(".ngrs-handle-max")],$=[c.find(".ngrs-value-min"),c.find(".ngrs-value-max")],V=c.find(".ngrs-join"),D="left",y="right",E=0,q=[0,0],C=0;l.filteredModelMin=l.modelMin,l.filteredModelMax=l.modelMax,g.$observe("disabled",function(e){angular.isDefined(e)||(l.disabled=t.disabled),l.$watch("disabled",M)}),g.$observe("orientation",function(e){angular.isDefined(e)||(l.orientation=t.orientation);for(var n,a=l.orientation.split(" "),i=0,s=a.length;s>i;i++)a[i]="ngrs-"+a[i];n=a.join(" "),w.addClass(n),"vertical"!==l.orientation&&"vertical left"!==l.orientation&&"vertical right"!==l.orientation||(D="top",y="bottom",E=1)}),g.$observe("step",function(e){angular.isDefined(e)||(l.step=t.step)}),g.$observe("decimalPlaces",function(e){angular.isDefined(e)||(l.decimalPlaces=t.decimalPlaces)}),g.$observe("showValues",function(e){angular.isDefined(e)?"false"===e?l.showValues=!1:l.showValues=!0:l.showValues=t.showValues}),g.$observe("pinHandle",function(e){angular.isDefined(e)&&("min"===e||"max"===e)?l.pinHandle=e:l.pinHandle=null,l.$watch("pinHandle",f)}),g.$observe("preventEqualMinMax",function(e){angular.isDefined(e)?"false"===e?l.preventEqualMinMax=!1:l.preventEqualMinMax=!0:l.preventEqualMinMax=t.preventEqualMinMax}),g.$observe("attachHandleValues",function(e){angular.isDefined(e)?"false"===e?l.attachHandleValues=!1:l.attachHandleValues=!0:l.attachHandleValues=t.attachHandleValues}),l.$watch("min",v),l.$watch("max",v),l.$watch("modelMin",h),l.$watch("modelMax",h),l.$on("$destroy",function(){w.off(i),angular.element("body").off(i),e.off(i);for(var n=0,a=H.length;a>n;n++)H[n].off(i),H[n].off(i+"X")}),w.bind("selectstart"+i,function(){return!1}).bind("click",function(e){e.stopPropagation()}),x(0),x(1)}}}]),window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}()}();