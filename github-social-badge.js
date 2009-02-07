// case-hardened GitHub badge
// Kent Brewster http://kentbrewster.com
// http://github.com/kentbrew/github-social-badge/tree/master

( function() { 
   var trueName = '';
   for (var i = 0; i < 16; i++) { 
      trueName += String.fromCharCode(Math.floor(Math.random() * 26) + 97); 
   }
   window[trueName] = {};
   var $ = window[trueName];
   $.d = document;
   $.f = function() {
      return { 
         runFunction : [],
         init : function(target) {
            var theScripts = $.d.getElementsByTagName('SCRIPT');
            for (var i = 0; i < theScripts.length; i++) {
               if (theScripts[i].src.match(target)) {
                  $.a = {};
                  if (theScripts[i].innerHTML) {
                     $.a = $.f.parseJson(theScripts[i].innerHTML);
                  }
                  if ($.a.err) {
                     alert($.a.err);
                  }
                  $.f.loadDefaults();
                  $.f.buildStructure();
                  $.f.buildPresentation();
                  theScripts[i].parentNode.insertBefore($.s, theScripts[i]);
                  theScripts[i].parentNode.removeChild(theScripts[i]);
                  break;
               }
            }         
         },
         parseJson : function(json) {
            this.parseJson.data = json;
            if ( typeof json !== 'string') {
               return {"err":"trying to parse a non-string JSON object"};
            }
            try {
               var f = Function(['var document,top,self,window,parent,Number,Date,Object,Function,',
                  'Array,String,Math,RegExp,Image,ActiveXObject;',
                  'return (' , json.replace(/<\!--.+-->/gim,'').replace(/\bfunction\b/g,'function&shy;') , ');'].join(''));
               return f();
            } catch (e) {
               return {"err":"trouble parsing JSON object; running with defaults"};
            }
         },
         loadDefaults : function() {
            var defaults = { 
               "view" : "projects",
               "user":"davglass",
               "headerText" : " on GitHub",
               "height" : 350,
               "width" : 300,
               "background" : "white",
               "border" : "1px solid black",
               "headerBackground" : "#ffa", 
               "headerColor" : "#000",
               "evenBackground" : "#fff",
               "oddBackground" : "#eee",
               "padding" : 3
            };
            for (var k in defaults) { if ($.a[k] === undefined) { $.a[k] = defaults[k]; } }
         },
         buildPresentation : function () {
            var ns = $.d.createElement('style');
            $.d.getElementsByTagName('head')[0].appendChild(ns);
            if (!window.createPopup) {
               ns.appendChild($.d.createTextNode(''));
               ns.setAttribute("type", "text/css");
            }
            var s = $.d.styleSheets[$.d.styleSheets.length - 1];
            var rules = {
               "" : "{zoom:1;margin:0;padding:0;width:" + ($.a.width) + "px;background:" + $.a.background + ";border:" + $.a.border + ";font:13px/1.2em tahoma, veranda, arial, helvetica, clean, sans-serif;*font-size:small;*font:x-small;}",
               "a" : "{cursor:pointer;text-decoration:none;}",
               "a:hover" : "{text-decoration:underline;}",
               "img":"{float:left; height:" + $.a.thumbnailSize + "px;width:" + $.a.thumbnailSize + "px;border:" + $.a.thumbnailBorder + ";margin-right:" + $.a.padding + ";}",
               "h3" : "{font-weight:bold;height:26px;line-height:26px;font-size:100%; margin:0;padding:" + $.a.padding + ";background:" + $.a.headerBackground + " url('http://github.com/favicon.ico') " + $.a.padding + "px 50% no-repeat;text-indent:28px;border-bottom:" + $.a.border + ";}",
               "h3.loading" : "{background-image:url('http://l.yimg.com/us.yimg.com/i/us/my/mw/anim_loading_sm.gif')}",
               "h3 a, h4 a" : "{color:" + $.a.headerColor + ";}",
               "h4" : "{font-weight:normal;font-size:87%;background:" + $.a.headerBackground + ";text-align:right;margin:0;padding:" + $.a.padding + "px;border-top:" + $.a.border + ";}",
               "ul":"{margin:0; padding:0; height:" + $.a.height + "px;width:" + $.a.width + "px;overflow-x:hidden;overflow-y:auto;}",
               "ul li":"{margin:0;padding:" + $.a.padding + "px;list-style:none;position:relative;}",
               "ul li.odd" : "{background:" + $.a.oddBackground + ";}",
               "ul li p":"{font-size:87%;padding-left:10px; margin:2px;}",
               "div":"{margin:0; padding:0; height:" + $.a.height + "px;width:" + $.a.width + "px;overflow-x:hidden;overflow-y:auto;}",
               "div img":"{margin:2px;}",
               "div a img":"{border:1px solid #000;}",
               "div a:hover img":"{border:1px solid #f00;}",
               ".selected":"{font-weight:bold;}",
               ".hidden":"{display:none;}"
            };
            var ieRules = "";
            for (r in rules) {
               var selector = '.' + trueName + ' ' + r;
               if (!window.createPopup) {
                  var theRule = $.d.createTextNode(selector + rules[r]);
                  ns.appendChild(theRule);
               } else {
                  ieRules += selector + rules[r];
               }
            } 
            if (window.createPopup) { s.cssText = ieRules; }
         },
         buildStructure : function() {
            $.s = $.d.createElement('DIV');
            $.s.className = trueName;         
            $.s.h = $.d.createElement('H3');
            $.s.h.a = $.d.createElement('A');
            $.s.h.a.innerHTML = $.a.user + $.a.headerText;
            $.s.h.a.href = 'http://github.com/' + $.a.user;
            $.s.h.a.target = '_github';
            $.s.h.appendChild($.s.h.a);
            $.s.appendChild($.s.h);
            $.s.r = $.d.createElement('UL');
            $.s.appendChild($.s.r);
            $.s.d = $.d.createElement('DIV');
            $.s.d.className = 'hidden';
            $.s.appendChild($.s.d);
            $.s.f = $.d.createElement('H4');

            $.s.f.p = $.d.createElement('A');
            $.s.f.p.innerHTML = 'projects';
            $.s.f.p.className = 'selected';
            $.s.f.p.onclick = function() {
               this.className = 'selected';
               $.a.view = 'projects';
               $.s.f.f.className = '';
               $.s.d.className = 'hidden';
               $.s.r.className = '';
            };
            $.s.f.appendChild($.s.f.p);

            $.s.f.appendChild($.d.createTextNode(' - '));

            $.s.f.f = $.d.createElement('A');
            $.s.f.f.innerHTML = 'following';
            $.s.f.f.onclick = function() {
               $.a.view = 'following';
               this.className = 'selected';
               $.s.f.p.className = '';
               $.s.d.className = '';
               $.s.r.className = 'hidden';
            };
            $.s.f.appendChild($.s.f.f);

            $.s.f.appendChild($.d.createTextNode(' - '));

            var a = $.d.createElement('A');
            a.innerHTML = 'get this';
            a.target = '_blank';
            a.href = 'http://kentbrewster.com/github-badge';
            $.s.f.appendChild(a);
            $.s.appendChild($.s.f);
            
            
            $.f.getProjects();
            $.f.getFollowing();
         },
         getFollowing : function() {
            $.s.h.className = 'loading';
            $.s.d.innerHTML = ''; 
            if (!$.f.runFunction) { $.f.runFunction = []; }
            var n = $.f.runFunction.length;
            var id = trueName + '.f.runFunction[' + n + ']';
            $.f.runFunction[n] = function(r) {
               delete($.f.runFunction[n]);
               $.f.removeScript(id);
               $.f.renderFollowing(r); 
            };
            var url = 'http://pipes.yahoo.com/pipes/pipe.run?_id=CO_7rOXz3RGwtBTQZMag4A&_render=json&u=' + $.a.user +'&_callback=' + id;
            $.f.runScript(url, id);
         },
         renderFollowing : function(r) {
            $.s.h.a.href = 'http://github.com/' + $.a.user;
            var u = r.value.items;
            if (u.length) {
               for (var i = 0; i < u.length; i++) {
                  var a = $.d.createElement('A');
                  var img = $.d.createElement('IMG');
                  img.src = u[i].img.src;
                  a.appendChild(img);
                  a.title = u[i].title;
                  a.onmousedown = function() {
                     $.s.h.className = 'loading';
                     $.s.h.style.backgroundImage = 'url(' + this.getElementsByTagName('IMG')[0].src + ')';
                     $.a.user = this.title;
                     $.f.getProjects();
                     $.f.getFollowing();
                  };
                  $.s.d.appendChild(a);
               }
               $.s.f.f.innerHTML = 'following (' + u.length + ')'; 
            } else {
               $.s.f.f.innerHTML = 'not following anyone' 
            }
         },
         getProjects : function() {
            $.s.h.className = 'loading';
            $.s.r.innerHTML = '';
            if (!$.f.runFunction) { $.f.runFunction = []; }
            var n = $.f.runFunction.length;
            var id = trueName + '.f.runFunction[' + n + ']';
            $.f.runFunction[n] = function(r) {
               delete($.f.runFunction[n]);
               $.f.removeScript(id);
               $.f.renderProjects(r.user); 
            };
            var url = 'http://github.com/api/v1/json/' + $.a.user + '?callback=' + id
            $.f.runScript(url, id);
         },
         renderProjects: function(z) { 
            $.s.h.className = '';
            $.s.h.a.innerHTML = $.a.user;
            if (z.name) {
               $.s.h.a.innerHTML = z.name;
            } 
            $.s.h.a.innerHTML += ' ' + $.a.headerText;
            if (z.repositories && z.repositories.length) {
               var r = z.repositories;
               for (var i = 0; i < r.length; i++) {
                  var li = $.d.createElement('LI');
                  if (i % 2) { li.className = 'odd'; }
                  var li = $.d.createElement('LI');
                  if (i % 2) { li.className = 'odd'; }
                  var a = $.d.createElement('A');
                  a.innerHTML = '&rArr;';
                  a.onmousedown = function() {
                     var p = this.parentNode.getElementsByTagName('P')[0];
                     if (p.className === 'hidden') {
                        this.innerHTML = '&dArr;';
                        p.className = 'none';
                     } else {
                        this.innerHTML = '&rArr;';
                        p.className = 'hidden';
                     }
                  };
                  li.appendChild(a);
                  li.appendChild($.d.createTextNode(' '));
                  var u = $.d.createElement('A');
                  u.innerHTML = r[i].name;
                  u.href = r[i].url;
                  u.target = '_github';
                  li.appendChild(u);
                  var p = $.d.createElement('P');
                  p.className = 'hidden';
                  p.appendChild($.d.createTextNode(r[i].description));
                  if (r[i].homepage) {
                     var h = $.d.createElement('A');
                     h.innerHTML = 'home page';
                     h.href = r[i].homepage;
                     h.target = '_github';
                     p.appendChild($.d.createTextNode(' - '));
                     p.appendChild(h);
                  }
                  li.appendChild(p);
                  if (i === 0) {
                     a.innerHTML = '&dArr;';
                     p.className = 'none';
                  }
                  $.s.r.appendChild(li);
               }
               $.s.f.p.innerHTML = 'projects (' + r.length + ')'; 
            } else {
               $.s.f.p.innerHTML = 'no projects' 
            }
         },
         runScript : function(url, id) {
            var s = $.d.createElement('script');
            s.id = id;
            s.type ='text/javascript';
            s.src = url;
            $.d.getElementsByTagName('body')[0].appendChild(s);
         },
         removeScript : function(id) {
            if ($.d.getElementById(id)) {
               var s = $.d.getElementById(id);
               s.parentNode.removeChild(s);
            }
         }         
      };
   }();
//   var thisScript = /^https?:\/\/[^\/]*yourdomain.com\/yourscript.js$/;
   var thisScript = /github-badge.js$/;
   if(typeof window.addEventListener !== 'undefined') {
      window.addEventListener('load', function() { $.f.init(thisScript); }, false);
   } else if(typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onload', function() { $.f.init(thisScript); });
   }
} )();
