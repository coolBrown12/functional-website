!function(i){var s={};function n(t){if(s[t])return s[t].exports;var e=s[t]={i:t,l:!1,exports:{}};return i[t].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=i,n.c=s,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=22)}({22:function(t,e,i){t.exports=i(23)},23:function(t,e,i){var s,n,r,a,o=jQuery;window.wp=window.wp||{},a=wp.media=function(t){var e,i=a.view.MediaFrame;if(i)return"select"===(t=_.defaults(t||{},{frame:"select"})).frame&&i.Select?e=new i.Select(t):"post"===t.frame&&i.Post?e=new i.Post(t):"manage"===t.frame&&i.Manage?e=new i.Manage(t):"image"===t.frame&&i.ImageDetails?e=new i.ImageDetails(t):"audio"===t.frame&&i.AudioDetails?e=new i.AudioDetails(t):"video"===t.frame&&i.VideoDetails?e=new i.VideoDetails(t):"edit-attachments"===t.frame&&i.EditAttachments&&(e=new i.EditAttachments(t)),delete t.frame,a.frame=e},_.extend(a,{model:{},view:{},controller:{},frames:{}}),r=a.model.l10n=window._wpMediaModelsL10n||{},a.model.settings=r.settings||{},delete r.settings,s=a.model.Attachment=i(24),n=a.model.Attachments=i(25),a.model.Query=i(26),a.model.PostImage=i(27),a.model.Selection=i(28),a.compare=function(t,e,i,s){return _.isEqual(t,e)?i===s?0:s<i?-1:1:e<t?-1:1},_.extend(a,{template:wp.template,post:wp.ajax.post,ajax:wp.ajax.send,fit:function(t){var e,i=t.width,s=t.height,n=t.maxWidth,t=t.maxHeight;return _.isUndefined(n)||_.isUndefined(t)?_.isUndefined(t)?e="width":_.isUndefined(n)&&t<s&&(e="height"):e=n/t<i/s?"width":"height","width"===e&&n<i?{width:n,height:Math.round(n*s/i)}:"height"===e&&t<s?{width:Math.round(t*i/s),height:t}:{width:i,height:s}},truncate:function(t,e,i){return i=i||"&hellip;",t.length<=(e=e||30)?t:t.substr(0,e/2)+i+t.substr(-1*e/2)}}),a.attachment=function(t){return s.get(t)},n.all=new n,a.query=function(t){return new n(null,{props:_.extend(_.defaults(t||{},{orderby:"date"}),{query:!0})})},o(window).on("unload",function(){window.wp=null})},24:function(t,e){var r=Backbone.$,i=Backbone.Model.extend({sync:function(t,e,i){return _.isUndefined(this.id)?r.Deferred().rejectWith(this).promise():"read"===t?((i=i||{}).context=this,i.data=_.extend(i.data||{},{action:"get-attachment",id:this.id}),wp.media.ajax(i)):"update"===t?this.get("nonces")&&this.get("nonces").update?((i=i||{}).context=this,i.data=_.extend(i.data||{},{action:"save-attachment",id:this.id,nonce:this.get("nonces").update,post_id:wp.media.model.settings.post.id}),e.hasChanged()&&(i.data.changes={},_.each(e.changed,function(t,e){i.data.changes[e]=this.get(e)},this)),wp.media.ajax(i)):r.Deferred().rejectWith(this).promise():"delete"===t?((i=i||{}).wait||(this.destroyed=!0),i.context=this,i.data=_.extend(i.data||{},{action:"delete-post",id:this.id,_wpnonce:this.get("nonces").delete}),wp.media.ajax(i).done(function(){this.destroyed=!0}).fail(function(){this.destroyed=!1})):Backbone.Model.prototype.sync.apply(this,arguments)},parse:function(t){return t&&(t.date=new Date(t.date),t.modified=new Date(t.modified),t)},saveCompat:function(t,s){var n=this;return this.get("nonces")&&this.get("nonces").update?wp.media.post("save-attachment-compat",_.defaults({id:this.id,nonce:this.get("nonces").update,post_id:wp.media.model.settings.post.id},t)).done(function(t,e,i){n.set(n.parse(t,i),s)}):r.Deferred().rejectWith(this).promise()}},{create:function(t){return wp.media.model.Attachments.all.push(t)},get:_.memoize(function(t,e){return wp.media.model.Attachments.all.push(e||{id:t})})});t.exports=i},25:function(t,e){var r=Backbone.Collection.extend({model:wp.media.model.Attachment,initialize:function(t,e){e=e||{},this.props=new Backbone.Model,this.filters=e.filters||{},this.props.on("change",this._changeFilteredProps,this),this.props.on("change:order",this._changeOrder,this),this.props.on("change:orderby",this._changeOrderby,this),this.props.on("change:query",this._changeQuery,this),this.props.set(_.defaults(e.props||{})),e.observe&&this.observe(e.observe)},_changeOrder:function(){this.comparator&&this.sort()},_changeOrderby:function(t,e){this.comparator&&this.comparator!==r.comparator||(e&&"post__in"!==e?this.comparator=r.comparator:delete this.comparator)},_changeQuery:function(t,e){e?(this.props.on("change",this._requery,this),this._requery()):this.props.off("change",this._requery,this)},_changeFilteredProps:function(n){this.props.get("query")||_.chain(n.changed).map(function(t,e){var i=r.filters[e],s=n.get(e);if(i){if(s&&!this.filters[e])this.filters[e]=i;else{if(s||this.filters[e]!==i)return;delete this.filters[e]}return!0}},this).any().value()&&(this._source||(this._source=new r(this.models)),this.reset(this._source.filter(this.validator,this)))},validateDestroyed:!1,validator:function(e){return!(!_.isUndefined(e.attributes.context)&&""!==e.attributes.context)&&(!(!this.validateDestroyed&&e.destroyed)&&_.all(this.filters,function(t){return!!t.call(this,e)},this))},validate:function(t,e){var i=this.validator(t),s=!!this.get(t.cid);return!i&&s?this.remove(t,e):i&&!s&&this.add(t,e),this},validateAll:function(t,e){return e=e||{},_.each(t.models,function(t){this.validate(t,{silent:!0})},this),e.silent||this.trigger("reset",this,e),this},observe:function(t){return this.observers=this.observers||[],this.observers.push(t),t.on("add change remove",this._validateHandler,this),t.on("reset",this._validateAllHandler,this),this.validateAll(t),this},unobserve:function(t){return t?(t.off(null,null,this),this.observers=_.without(this.observers,t)):(_.each(this.observers,function(t){t.off(null,null,this)},this),delete this.observers),this},_validateHandler:function(t,e,i){return i=e===this.mirroring?i:{silent:i&&i.silent},this.validate(t,i)},_validateAllHandler:function(t,e){return this.validateAll(t,e)},mirror:function(t){return this.mirroring&&this.mirroring===t||(this.unmirror(),this.mirroring=t,this.reset([],{silent:!0}),this.observe(t)),this},unmirror:function(){this.mirroring&&(this.unobserve(this.mirroring),delete this.mirroring)},more:function(t){var e=jQuery.Deferred(),i=this.mirroring,s=this;return i&&i.more?(i.more(t).done(function(){this===s.mirroring&&e.resolveWith(this)}),e.promise()):e.resolveWith(this).promise()},hasMore:function(){return!!this.mirroring&&this.mirroring.hasMore()},parse:function(t,i){return _.isArray(t)||(t=[t]),_.map(t,function(t){var e;return t instanceof Backbone.Model?(e=t.get("id"),t=t.attributes):e=t.id,t=(e=wp.media.model.Attachment.get(e)).parse(t,i),_.isEqual(e.attributes,t)||e.set(t),e})},_requery:function(t){var e;this.props.get("query")&&((e=this.props.toJSON()).cache=!0!==t,this.mirror(wp.media.model.Query.get(e)))},saveMenuOrder:function(){if("menuOrder"===this.props.get("orderby")){var t=this.chain().filter(function(t){return!_.isUndefined(t.id)}).map(function(t,e){return t.set("menuOrder",e+=1),[t.id,e]}).object().value();if(!_.isEmpty(t))return wp.media.post("save-attachment-order",{nonce:wp.media.model.settings.post.nonce,post_id:wp.media.model.settings.post.id,attachments:t})}}},{comparator:function(t,e,i){var s=this.props.get("orderby"),n=this.props.get("order")||"DESC",r=t.cid,a=e.cid;return t=t.get(s),e=e.get(s),"date"!==s&&"modified"!==s||(t=t||new Date,e=e||new Date),i&&i.ties&&(r=a=null),"DESC"===n?wp.media.compare(t,e,r,a):wp.media.compare(e,t,a,r)},filters:{search:function(e){return!this.props.get("search")||_.any(["title","filename","description","caption","name"],function(t){t=e.get(t);return t&&-1!==t.search(this.props.get("search"))},this)},type:function(t){var e,i=this.props.get("type"),t=t.toJSON();return!(i&&(!_.isArray(i)||i.length))||(e=t.mime||t.file&&t.file.type||"",_.isArray(i)?_.find(i,function(t){return-1!==e.indexOf(t)}):-1!==e.indexOf(i))},uploadedTo:function(t){var e=this.props.get("uploadedTo");return!!_.isUndefined(e)||e===t.get("uploadedTo")},status:function(t){var e=this.props.get("status");return!!_.isUndefined(e)||e===t.get("status")}}});t.exports=r},26:function(t,e){var o,n=wp.media.model.Attachments,h=n.extend({initialize:function(t,e){var i;e=e||{},n.prototype.initialize.apply(this,arguments),this.args=e.args,this._hasMore=!0,this.created=new Date,this.filters.order=function(t){var e=this.props.get("orderby"),i=this.props.get("order");return!this.comparator||(this.length?1!==this.comparator(t,this.last(),{ties:!0}):"DESC"!==i||"date"!==e&&"modified"!==e?"ASC"===i&&"menuOrder"===e&&0===t.get(e):t.get(e)>=this.created)},i=["s","order","orderby","posts_per_page","post_mime_type","post_parent","author"],wp.Uploader&&_(this.args).chain().keys().difference(i).isEmpty().value()&&this.observe(wp.Uploader.queue)},hasMore:function(){return this._hasMore},more:function(t){var e=this;return this._more&&"pending"===this._more.state()?this._more:this.hasMore()?((t=t||{}).remove=!1,this._more=this.fetch(t).done(function(t){(_.isEmpty(t)||-1===this.args.posts_per_page||t.length<this.args.posts_per_page)&&(e._hasMore=!1)})):jQuery.Deferred().resolveWith(this).promise()},sync:function(t,e,i){var s;return"read"===t?((i=i||{}).context=this,i.data=_.extend(i.data||{},{action:"query-attachments",post_id:wp.media.model.settings.post.id}),-1!==(s=_.clone(this.args)).posts_per_page&&(s.paged=Math.round(this.length/s.posts_per_page)+1),i.data.query=s,wp.media.ajax(i)):(n.prototype.sync?n.prototype:Backbone).sync.apply(this,arguments)}},{defaultProps:{orderby:"date",order:"DESC"},defaultArgs:{posts_per_page:40},orderby:{allowed:["name","author","date","title","modified","uploadedTo","id","post__in","menuOrder"],valuemap:{id:"ID",uploadedTo:"parent",menuOrder:"menu_order ID"}},propmap:{search:"s",type:"post_mime_type",perPage:"posts_per_page",menuOrder:"menu_order",uploadedTo:"post_parent",status:"post_status",include:"post__in",exclude:"post__not_in",author:"author"},get:(o=[],function(e,t){var i,s={},n=h.orderby,r=h.defaultProps,a=!!e.cache||_.isUndefined(e.cache);return delete e.query,delete e.cache,_.defaults(e,r),e.order=e.order.toUpperCase(),"DESC"!==e.order&&"ASC"!==e.order&&(e.order=r.order.toUpperCase()),_.contains(n.allowed,e.orderby)||(e.orderby=r.orderby),_.each(["include","exclude"],function(t){e[t]&&!_.isArray(e[t])&&(e[t]=[e[t]])}),_.each(e,function(t,e){_.isNull(t)||(s[h.propmap[e]||e]=t)}),_.defaults(s,h.defaultArgs),s.orderby=n.valuemap[e.orderby]||e.orderby,a?i=_.find(o,function(t){return _.isEqual(t.args,s)}):o=[],i||(i=new h([],_.extend(t||{},{props:e,args:s})),o.push(i)),i})});t.exports=h},27:function(t,e){var i=Backbone.Model.extend({initialize:function(t){var e=wp.media.model.Attachment;this.attachment=!1,t.attachment_id&&(this.attachment=e.get(t.attachment_id),this.attachment.get("url")?(this.dfd=jQuery.Deferred(),this.dfd.resolve()):this.dfd=this.attachment.fetch(),this.bindAttachmentListeners()),this.on("change:link",this.updateLinkUrl,this),this.on("change:size",this.updateSize,this),this.setLinkTypeFromUrl(),this.setAspectRatio(),this.set("originalUrl",t.url)},bindAttachmentListeners:function(){this.listenTo(this.attachment,"sync",this.setLinkTypeFromUrl),this.listenTo(this.attachment,"sync",this.setAspectRatio),this.listenTo(this.attachment,"change",this.updateSize)},changeAttachment:function(t,e){this.stopListening(this.attachment),this.attachment=t,this.bindAttachmentListeners(),this.set("attachment_id",this.attachment.get("id")),this.set("caption",this.attachment.get("caption")),this.set("alt",this.attachment.get("alt")),this.set("size",e.get("size")),this.set("align",e.get("align")),this.set("link",e.get("link")),this.updateLinkUrl(),this.updateSize()},setLinkTypeFromUrl:function(){var t,e=this.get("linkUrl");e?(t="custom",this.attachment?this.attachment.get("url")===e?t="file":this.attachment.get("link")===e&&(t="post"):this.get("url")===e&&(t="file"),this.set("link",t)):this.set("link","none")},updateLinkUrl:function(){var t;switch(this.get("link")){case"file":t=(this.attachment||this).get("url"),this.set("linkUrl",t);break;case"post":this.set("linkUrl",this.attachment.get("link"));break;case"none":this.set("linkUrl","")}},updateSize:function(){var t;if(this.attachment){if("custom"===this.get("size"))return this.set("width",this.get("customWidth")),this.set("height",this.get("customHeight")),void this.set("url",this.get("originalUrl"));(t=this.attachment.get("sizes")[this.get("size")])&&(this.set("url",t.url),this.set("width",t.width),this.set("height",t.height))}},setAspectRatio:function(){var t;this.attachment&&this.attachment.get("sizes")&&(t=this.attachment.get("sizes").full)?this.set("aspectRatio",t.width/t.height):this.set("aspectRatio",this.get("customWidth")/this.get("customHeight"))}});t.exports=i},28:function(t,e){var i=wp.media.model.Attachments,s=i.extend({initialize:function(t,e){i.prototype.initialize.apply(this,arguments),this.multiple=e&&e.multiple,this.on("add remove reset",_.bind(this.single,this,!1))},add:function(t,e){return this.multiple||this.remove(this.models),i.prototype.add.call(this,t,e)},single:function(t){var e=this._single;return t&&(this._single=t),this._single&&!this.get(this._single.cid)&&delete this._single,this._single=this._single||this.last(),this._single!==e&&(e&&(e.trigger("selection:unsingle",e,this),this.get(e.cid)||this.trigger("selection:unsingle",e,this)),this._single&&this._single.trigger("selection:single",this._single,this)),this._single}});t.exports=s}});