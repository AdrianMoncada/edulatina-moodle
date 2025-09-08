/**
 * Vvveb
 *
 * Copyright (C) 2022  Ziadin Givan
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

/*
 "elements/testimonial",
 "elements/code",
 "elements/social-icons",
 "elements/carousel",
 "elements/icon-list",
 popup-button cu editare continut popup cu un toggle ca la flip box
 * 
 * accordion
 * sideblock
 * tabs
 * slider
 * parallax
 * fullscreen slider
 * 
 * section, footer, header, icon,gallery,slider,menu,logo,tabs,accordion,flip-box,counter,contact-form,svg-icon, cover, counter, contact form, flip box
 
 
 
 */ 

Vvveb.ComponentsGroup['Elements'] = [
/*sections */
"elements/svg-icon",
"elements/gallery",
// "elements/slider",
"elements/menu",
//"elements/logo",
// "elements/tabs",
// "elements/accordion",
// "elements/flip-box",
// "elements/counter",
// "elements/contact-form",
// "elements/svg-icon",
// "elements/figure",
// "elements/subscribe-form",
// "elements/testimonial",
// "elements/social-icons",
// "elements/carousel",
// "elements/icon-list",
// "elements/divider",
// "elements/separator",
// "elements/image-box",//card cu imagine
// "elements/icon-box",
// "elements/animated-headline",
// "elements/price-table",
// "elements/price-list",
// "elements/reviews",
// "elements/code",
// "elements/image-compare",
"elements/back-to-top",
"elements/blob", //https://unlimited-elements.com/blob-shape-widget-for-elementor/
"elements/image-shape", //https://unlimited-elements.com/image-shapes-for-elementor-page-builder/
"elements/image-shape", //https://unlimited-elements.com/image-shapes-for-elementor-page-builder/
"elements/rating",
"elements/section", 
"elements/footer", 
"elements/header", 
// cover
//counter
//contact form
//flip box - https://www.w3schools.com/howto/howto_css_flip_box.asp
];

// Section
/*
 content
	- hide on desktop
	- hide on tablet
	- hide on mobile
 style
	- background
		- image
			- url 
			- size - cover / contain /auto
			- attachement - scroll / fixed / parallax
			- position
				- top 
				- left
			- size
				- width
				- height
		- video
			- native
			- yotube 
			- vimeo
			- url
		- slider?	
		- color
	- background overlay
		-color
			- color
		- gradient
			- type - linear / radial
			- color
			- secondary color
			- angle 
			- position
			
		- opacity
		- blend mode

	- separator 
		- top
			- divider
			- color
			- width
			- height
		- bottom
	- padding
	- margin
*/ 




Vvveb.Components.extend("_base","elements/figure", {
    nodes: ["figure"],
	name: "Figure",
    image: "icons/image.svg",
    resizable:true,
    html: `<figure>
		  <img src="${Vvveb.baseUrl}icons/image.svg" alt="Trulli">
		  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
		  <div class="border"></div>
		</figure>`,
		
	stylesheets:[
		{
			//the css is added in head when the element is added to page
			'src': Vvveb.baseUrl + 'css/figure.css',
			//the css is removed on save if none of the figure elements are present in the page
			'mustHaveElement':"figure",
		},
	],
	/*
	javascripts:[
		{
			'src': Vvveb.baseUrl + 'css/figure.js',
			//the js is removed on save if none of the figure elements are present in the page
			'mustHaveElement':"figure",
		}
	],*/	
    resizable:true,//show select box resize handlers
    
    properties: [{
        name: "Image",
        key: "src",
        child:"img",
        htmlAttr: "src",
        inputtype: ImageInput
    }, {
        name: "Width",
        key: "width",
        child:"img",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: "Height",
        key: "height",
        child:"img",
        htmlAttr: "height",
        inputtype: TextInput
    }, {
        name: "Alt",
        key: "alt",
        child:"img",
        htmlAttr: "alt",
        inputtype: TextInput
    }, {
        name: "Caption",
        key: "caption",
        child:"figcaption",
        htmlAttr: "innerHTML",
        inputtype: TextareaInput
    }]    
});



//Icon
Vvveb.Components.add("elements/icon", {
    nodes: ["i.icon"],
    name: "Font Icon",
    image: "icons/star.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   
/*
V.Resources.Icons =
[{
	value: `stopwatch.svg`,
	text: "Star"
}, 
{
	value: `envelope.svg`,
	text: "Sections"
}, {
	value: `star.svg`,
	text: "Flipbox"
}];*/

Vvveb.Components.extend("_base","elements/svg-icon", {
    nodes: ["svg"],
    name: "Svg Icon",
    image: "icons/star.svg",
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64">
		<path d="M 30.335938 12.546875 L 20.164063 11.472656 L 16 2.132813 L 11.835938 11.472656 L 1.664063 12.546875 L 9.261719 19.394531 L 7.140625 29.398438 L 16 24.289063 L 24.859375 29.398438 L 22.738281 19.394531 Z"/>
    </svg>`,
    properties: [{
		name: "Icon",
		key: "icon",
		inline:true,
		inputtype: HtmlListSelectInput,
		onChange:function(element, value, input, component) {
			var newElement = $(value);
			let attributes = element.prop("attributes");
			
			//keep old svg size and colors
			$.each(attributes, function() {
				if (this.name == "viewBox") return;
                newElement.attr(this.name, this.value);
            });
            
			element.replaceWith(newElement);
			return newElement;
		},
		data: {
			url: Vvveb.baseUrl + "../../resources/svg/icons/{value}/index.html",
			clickElement:"li",
			insertElement:"svg",
			elements: 'Loading ...',
			options: [{
                value: "eva-icons",
                text: "Eva icons"
            }, {
                value: "ionicons",
                text: "IonIcons"
            }, {
                value: "linea",
                text: "Linea"
            }, {
                value: "remix-icon",
                text: "RemixIcon"
            }, {
                value: "unicons",
                text: "Unicons"
            }, {
                value: "clarity-icons",
                text: "Clarity icons"
            }, {
                value: "jam-icons",
                text: "Jam icons"
            }, {
                value: "ant-design-icons",
                text: "Ant design icons"
            }, {
                value: "themify",
                text: "Themify"
            }, {
                value: "css.gg",
                text: "Css.gg"
            }, {
                value: "olicons",
                text: "Olicons"
            }, {
		value: "open-iconic",
		text: "Open iconic"
            }, {
                value: "boxicons",
                text: "Box icons"
            }, {
                value: "elegant-font",
                text: "Elegant font"
            }, {
                value: "dripicons",
                text: "Dripicons"
            }, {
                value: "feather",
                text: "Feather"
            }, {
                value: "coreui-icons",
                text: "Coreui icons"
            }, {
                value: "heroicons",
                text: "Heroicons"
            }, {
                value: "iconoir",
                text: "Iconoir"
            }, {
                value: "iconsax",
                text: "Iconsax"
            }, {
                value: "ikonate",
                text: "Ikonate"
            }, {
                value: "tabler-icons",
                text: "Tabler icons"
            }, {
                value: "octicons",
                text: "Octicons"
            }, {
                value: "system-uicons",
                text: "System-uicons"
            }, {
                value: "font-awesome",
                text: "FontAwesome"
            }, {
                value: "pe-icon-7-stroke",
                text: "Pixeden icon 7 stroke"
            }, {
                value: "77_essential_icons",
                text: "77 essential icons"
            }, {
                value: "150-outlined-icons",
                text: "150 outlined icons"
            }, {
                value: "material-design",
                text: "Material Design"
            }]
		},
	}, {
		name: "Width",
		key: "width",
		htmlAttr: "width",
		inputtype: RangeInput,
		data:{
			max: 640,
			min:6,
			step:1
		}
   }, {
		name: "Height",
		key: "height",
		htmlAttr: "height",
		inputtype: RangeInput,
		data:{
			max: 640,
			min:6,
			step:1
		}			
   }, {
		name: "Stroke width",
		key: "stroke-width",
		htmlAttr: "stroke-width",
		inputtype: RangeInput,
		data:{
			max: 512,
			min:1,
			step:1
		}			
   },{
		key: "svg_style_header",
		inputtype: SectionInput,
		name:false,
		//sort: base_sort++,
		section: style_section,
		data: {header:"Svg colors"},
	}, {
        name: "Fill Color",
        key: "fill",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "fill",
        inputtype: ColorInput,
   },{
        name: "Color",
        key: "color",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "color",
        inputtype: ColorInput,
   },{
        name: "Stroke",
        key: "Stroke",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "color",
        inputtype: ColorInput,
  	}]
});   


Vvveb.Components.add("elements/svg-element", {
    nodes: ["path", "line", "polyline", "polygon", "rect", "circle", "ellipse", "g"],
    name: "Svg element",
    image: "icons/star.svg",
    html: ``,
    properties: [{
        name: "Fill Color",
        key: "fill",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "fill",
        inputtype: ColorInput,
   },{
        name: "Color",
        key: "color",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "color",
        inputtype: ColorInput,
   },{
        name: "Stroke",
        key: "Stroke",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "color",
        inputtype: ColorInput,
  	}, {
  		name: "Stroke width",
		key: "stroke-width",
		htmlAttr: "stroke-width",
		inputtype: RangeInput,
		data:{
			max: 512,
			min:1,
			step:1
		}			
	}]
});  

//Gallery
Vvveb.Components.add("elements/gallery", {
    attributes: ["data-component-gallery"],
    name: "Gallery",
    image: "icons/images.svg",
    html: `
	<div class="row justify-content-center gallery masonry has-shadow"  data-component-gallery title="component-gallery">
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/1.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/2.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/3.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/4.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/5.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/6.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/7.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/2.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/5.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/3.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/6.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
    <div class="item">
        <a href="#" >
            <img class="img-fluid img-thumbnail" src="https://staticcdn.edwiser.org/v40/CDN/grid_view/4.jpeg" alt="" />
            <h5 class="overlay-title">Lorem Ipsum</h5>
        </a>
    </div>
</div>
			`,
		properties: [{
			name: "Masonry layout",
			key: "masonry",
			htmlAttr: "class",
			validValues: ["masonry", "flex"],
			inputtype: ToggleInput,
			data: {
				on: "masonry",
				off: "flex"
			},
			setGroup: group => {
				$('.mb-3[data-group]').attr('style','display:none !important');
				$('.mb-3[data-group="'+ group + '"]').attr('style','');
			}, 		
			onChange : function(node, value, input)  {
				this.setGroup(value);
				return node;
			}, 
			init: function (node) {
				if ($(node).hasClass("masonry")) {
					return "masonry";
				} else {
					return "flex";
				}
			},   			
		}, {
			name: "Image shadow",
			key: "shadow",
			htmlAttr: "class",
			validValues: [ "", "has-shadow"],
			inputtype: ToggleInput,
			data: {
				on: "has-shadow",
				off: ""
			},
		}, {
			name: "Horizontal gap",
			key: "column-gap",
			htmlAttr: "style",
			inputtype: CssUnitInput,
			data:{
				max: 100,
				min:0,
				step:1
			}
	   }, {
			name: "Vertical gap",
			key: "margin-bottom",
			htmlAttr: "style",
			child: ".item",
			inputtype: CssUnitInput,
			data:{
				max: 100,
				min:0,
				step:1
			}
	   }, {
			name: "Images per row masonry",
			key: "column-count",
			group:"masonry",
			htmlAttr: "style",
			inputtype: RangeInput,
			data:{
				max: 12,
				min:1,
				step:1
			}
		}, {
			name: "Images per row flex",
			group:"flex",
			key: "flex-basis",
			child: ".item",
			htmlAttr: "style",
			inputtype: RangeInput,
			data:{
				max: 12,
				min:1,
				step:1
			},
			onChange: function(node, value, input, component, inputElement) {
				if (value) {
					value = 100 / value;
					value += "%";
				} 
				
				return value;
			}  			
	   }, {
			name: "",
			key: "addChild",
			inputtype: ButtonInput,
			data: {text:"Add image", icon:"la la-plus"},
			onChange: function(node) {
				 $(node).append('<div class="item"><a><img src="https://staticcdn.edwiser.org/v40/CDN/grid_view/6.jpeg"></a></div>');
				 
				 //render component properties again to include the new image
				 //Vvveb.Components.render("ellements/gallery");
				 
				 return node;
			}
	}],
    init(node)	{
		
		$('.mb-3[data-group]').attr('style','display:none !important');
		
		let source = "flex";
		if ($(node).hasClass("masonry")) {
			source = "masonry";
		} else {
			source = "flex";
		}

		$('.mb-3[data-group="'+ source + '"]').attr('style','');
	}	
});  

//Slider
Vvveb.Components.add("elements/slider", {
    nodes: ["i.icon"],
    name: "Slider",
    image: "icons/slider.svg",
    html: `<section>
				<div class="container>
					<h1>Container</h1>
				</div>
			</section>`,
    properties: [
		  {
			name: "Width",
			key: "width",
			htmlAttr: "width",
			inputtype: RangeInput,
			data:{
				max: 640,
				min:6,
				step:1
			}
		   }, {
			name: "Height",
			key: "height",
			htmlAttr: "height",
			inputtype: RangeInput,
			data:{
				max: 640,
				min:6,
				step:1
		   },
		}
	]
}); 	

//Menu
Vvveb.Components.add("elements/Menu", {
    nodes: ["i.icon"],
    name: "menu",
    image: "icons/navbar.svg",
    html: `<section>
				<div class="container>
					<h1>Container</h1>
				</div>
			</section>`,
    properties: [
	]
}); 	

//Logo
/*
Vvveb.Components.add("elements/logo", {
    nodes: ["i.icon"],
    name: "Logo",
    image: "icons/logo.svg",
    html: `<section>
				<div class="container>
					<h1>Container</h1>
				</div>
			</section>`,
    properties: [
	]
}); 	
*/
//Tabs
Vvveb.Components.add("elements/tab", {
	//attributes: ["data-component-tabs"],
    name: "Tab",
    image: "icons/tabs.svg",
    html: ``,
    properties: [{
			name: "Id",
			key: "id",
			htmlAttr: "id",
			inline:false,
			col:6,
			inputtype: TextInput
		}, {
			name: "Class",
			key: "class",
			htmlAttr: "class",
			inline:false,
			col:6,
			inputtype: TextInput
			
		}
	]
}); 
	
Vvveb.Components.add("elements/tabs", {
    attributes: ["data-component-tabs"],
    name: "Tabs",
    image: "icons/tabs.svg",
    html: `
	<div data-component-tabs>
		<div class="shadow">
			<nav>
			  <div class="nav nav-tabs" id="nav-tab" role="tablist">
				<button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
				<button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
				<button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
				<button class="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" disabled>Disabled</button>
			  </div>
			</nav>
			<div class="tab-content" id="nav-tabContent">
			  <div class="tab-pane show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis perferendis rem accusantium ducimus animi nesciunt expedita omnis aut quas molestias!</p>
			  </div>
			  <div class="tab-pane" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
				<p>Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin</p>
			  </div>
			  <div class="tab-pane" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
				<p>Quisque sagittis non ex eget vestibulum</p>
			  </div>
			  <div class="tab-pane" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabindex="0">
				<p>Sed viverra pellentesque dictum.</p>
			  </div>
			</div>
		</div>
	</div>`,
    properties: [
		{
			//name: "List",
			key: "list",
			inline:false,
			inputtype: ListInput,
			data: {
				options: [{
					name: "btn-default",
					type: "Default",
					suffix: "unu"
				}, {
					name: "btn-asdasd",
					type: "Second",
					suffix: "doi"
				}, {
					name: "btn-435435",
					type: "Third",
					suffix: "trei"
				}]
			}
		}
	]
}); 	

//Accordion
Vvveb.Components.add("elements/accordion", {
    nodes: [".accordion"],
    name: "Accordion",
    image: "icons/accordion.svg",
    html: `<div class="accordion" id="accordionExample[[inst]]">
    <div class="card">
      <div class="card-header" id="headingOne[[inst]]">
        <h2 class="mb-0">
          <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne[[inst]]" aria-expanded="true" aria-controls="collapseOne[[inst]]">
            Collapsible Group Item #1
          </button>
        </h2>
      </div>
  
      <div id="collapseOne[[inst]]" class="collapse show" aria-labelledby="headingOne[[inst]]" data-parent="#accordionExample[[inst]]">
        <div class="card-body">
          Some placeholder content for the first accordion panel. This panel is shown by default, thanks to the <code>.show</code> class.
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header" id="headingTwo[[inst]]">
        <h2 class="mb-0">
          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo[[inst]]" aria-expanded="false" aria-controls="collapseTwo[[inst]]">
            Collapsible Group Item #2
          </button>
        </h2>
      </div>
      <div id="collapseTwo[[inst]]" class="collapse" aria-labelledby="headingTwo[[inst]]" data-parent="#accordionExample[[inst]]">
        <div class="card-body">
          Some placeholder content for the second accordion panel. This panel is hidden by default.
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header" id="headingThree[[inst]]">
        <h2 class="mb-0">
          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree[[inst]]" aria-expanded="false" aria-controls="collapseThree[[inst]]">
            Collapsible Group Item #3
          </button>
        </h2>
      </div>
      <div id="collapseThree[[inst]]" class="collapse" aria-labelledby="headingThree[[inst]]" data-parent="#accordionExample[[inst]]">
        <div class="card-body">
          And lastly, the placeholder content for the third and final accordion panel. This panel is hidden by default.
        </div>
      </div>
    </div>
  </div>`,
    beforeInit: function (node) {
        var id = Math.floor(Math.random() * (30 - 1) + 1);
        node.innerHTML = node.innerHTML.replaceAll("[[inst]]", id);
        return node;
    },
    properties: [
		{
			name: "Flush",
			key: "flush",
			htmlAttr: "class",
			validValues: ["accordion-flush"],
			inputtype: ToggleInput,
			data: {
				on: "accordion-flush",
				off: ""
			}
		},
	]
}); 

Vvveb.Components.add("elements/flip-box", {
    nodes: [".flip-box"],
    name: "Flip box",
    image: "icons/flipbox.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/contact-form", {
    nodes: [".contact-form"],
    name: "Contact form",
    image: "icons/envelope.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/counter", {
    nodes: [".counter"],
    name: "Counter",
    image: "icons/stopwatch.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/subscribe-form", {
    nodes: [".counter"],
    name: "Subscribe form",
    image: "icons/bell.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/testimonial", {
    nodes: [".counter"],
    name: "Testimonial",
    image: "icons/testimonial.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/social-icons", {
    nodes: [".counter"],
    name: "Social icons",
    image: "icons/social-icons.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/carousel", {
    nodes: [".counter"],
    name: "Carousel",
    image: "icons/carousel.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   


Vvveb.Components.add("elements/icon-list", {
    nodes: [".counter"],
    name: "Icon list",
    image: "icons/icon-list.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/divider", {
    nodes: [".counter"],
    name: "Divider",
    image: "icons/stopwatch.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/separator", {
    nodes: [".counter"],
    name: "Separator",
    image: "icons/separator.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/Image box", {
    nodes: [".counter"],
    name: "Image Box",
    image: "icons/stopwatch.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/Icon box", {
    nodes: [".counter"],
    name: "Image Box",
    image: "icons/stopwatch.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/animated-headline", {
    nodes: [".counter"],
    name: "Animated headline",
    image: "icons/heading.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/price-table", {
    nodes: [".counter"],
    name: "Price table",
    image: "icons/price-table.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/price-list", {
    nodes: [".counter"],
    name: "Price list",
    image: "icons/stopwatch.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/reviews", {
    nodes: [".counter"],
    name: "Reviews",
    image: "icons/reviews.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/code", {
    nodes: [".counter"],
    name: "Code",
    image: "icons/code.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
}); 
  
Vvveb.Components.add("elements/image-compare", {
    nodes: [".counter"],
    name: "Image Compare",
    image: "icons/image-compare.svg",
    html: `<i class="font-icon la la-star"></i>`,
    properties: [
	]
});   

Vvveb.Components.add("elements/rating", {
    nodes: [".rating"],
    name: "Rating stars",
    image: "icons/rating.svg",
    html: `<div class="rating">
                <i class="fa fa-star text-warning"></i>
                <i class="fa fa-star text-warning"></i>
                <i class="fa fa-star text-warning"></i>
                <i class="fa fa-star text-warning"></i>
                <i class="fa fa-star text-secondary"></i>
            </div>`,
    properties: [
	]
});   


/* Section */
let ComponentSectionContent = [{
        name: "Title",
        key: "title",
        htmlAttr: "title",
        inputtype: TextInput
    }, {
        name: "Container width",
        key: "container-width",
		child:"> .section-container, > .container-fluid",
        htmlAttr: "class",
        validValues: ["section-container", "container-fluid"],
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
				value: "section-container",
				icon:"la la-box",
				text: "Boxed",
				title: "Boxed"
			},
			{
				value: "container-fluid",
				icon:"la la-arrows-alt-h",
				title: "Full",
				text: "Full"
			}]
        }
	},
    /* {
        name: "Container height",
        key: "container-height",
		child:"> .container:first-child, > .container-fluid:first-child",
        htmlAttr: "class",
        validValues: ["", "vh-100"],
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
				value: "container",
				icon:"la la-expand",
				text: "Auto",
				title: "Auto",
				checked:true,
			},
			{
				value: "vh-100",
				icon:"la la-arrows-alt-v",
				title: "Full",
				text: "Full"
			}]
        }
	}, {
        key: "section_separators",
        inputtype: SectionInput,
        name:false,
        sort: base_sort++,
		//section: style_section,
        data: {header:"Separators"},
	},{
        name: false,
        key: "type",
        inputtype: RadioButtonInput,
		htmlAttr:"data-separators",
        data: {
            inline: true,
            extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "top",
                text: "Top Separator",
                title: "Top Separator",
                icon:"la la-arrow-up",
            }, {
                value: "bottom",
                text: "Bottom Separator",
                title: "Bottom Separator",
                icon:"la la-arrow-down",
            }],
        },
		onChange : function(element, value, input) {

			$('.mb-3[data-group]').hide();
			$('.mb-3[data-group="'+ input.value + '"]').show();

			return element;
		},
		init: function(node) {
			return node.dataset.type;
		}
	}, {
        key: "section_background_header",
        inputtype: SectionInput,
        name:false,
        sort: base_sort++,
		//section: style_section,
        data: {header:"Background"},
   },{
        name: false,
        key: "type",
        inputtype: RadioButtonInput,
		htmlAttr:"data-type",
        data: {
            inline: true,
            extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "none",
                text: "None",
                title: "None",
                checked:true,
            }, {
                value: "image",
                icon:"la la-image",
                text: "Image",
                title: "Image",
			}, {
                value: "gradient",
                icon:"la la-palette",
                text: "Gradient",
                title: "Gradient",
			}, {
                value: "video",
                icon:"la la-video",
                text: "Video",
                title: "Video",
			}, {
                value: "slideshow",
                icon:"la la-arrows-alt-h",
                text: "Slider",
                title: "Slider",
            }],
        },
		onChange : function(element, value, input) {

			$('.mb-3[data-group]').hide();
			$('.mb-3[data-group="'+ input.value + '"]').show();

			return element;
		},
		init: function(node) {
			return node.dataset.type;
		},
   }*/
];


let ComponentSectionStyle =  [{
		key: "Section Style",
		inputtype: SectionInput,
		name:false,
		section: style_section,
		data: {header:"Style"},

	},{
        name: "Text1 Style",
        key: "text1",
        htmlAttr: "innerHTML",
        inputtype: TextInput,
        section: style_section,
    }, {
        name: "Name1 Style",
        key: "name1",
        htmlAttr: "name",
        inputtype: TextInput,
        section: style_section,
    }, {
        name: "Type1 Style",
        key: "type1",
		htmlAttr: "type",
        inputtype: SelectInput,
        section: style_section,
        data: {
			options: [{
				value: "button",
				text: "button"
			}, {
				value: "reset",
				text: "reset"
			}, {
				value: "submit",
				text: "submit"
			}],
		}
   	},{
        name: "Autofocus1 Style",
        key: "autofocus1",
        htmlAttr: "autofocus",
        inputtype: CheckboxInput,
		inline:true,
        col:6,
        section: style_section
   	},{
        name: "Disabled1 Style",
        key: "disabled1",
        htmlAttr: "disabled",
        inputtype: CheckboxInput,
		inline:true,
        col:6,
        section: style_section,
}];

let ComponentSectionAdvanced =  [{
		key: "Section Advanced",
		inputtype: SectionInput,
		name:false,
		section: advanced_section,
		data: {header:"Advanced"},

	},{
        name: "Text1 Advanced",
        key: "text1",
        htmlAttr: "innerHTML",
        inputtype: TextInput,
        section: advanced_section,
    }, {
        name: "Name1 Advanced",
        key: "name1",
        htmlAttr: "name",
        inputtype: TextInput,
        section: advanced_section,
    }, {
        name: "Type1 Advanced",
        key: "type1",
		htmlAttr: "type",
        inputtype: SelectInput,
        section: advanced_section,
        data: {
			options: [{
				value: "button",
				text: "button"
			}, {
				value: "reset",
				text: "reset"
			}, {
				value: "submit",
				text: "submit"
			}],
		}
   	},{
        name: "Autofocus1 Advanced",
        key: "autofocus1",
        htmlAttr: "autofocus",
        inputtype: CheckboxInput,
		inline:true,
        col:6,
        section: advanced_section
   	},{
        name: "Disabled1 Advanced",
        key: "disabled1",
        htmlAttr: "disabled",
        inputtype: CheckboxInput,
		inline:true,
        col:6,
        section: advanced_section,
}];


Vvveb.Components.extend("_base","elements/section", {
    nodes: ["section"],
    name: "Section",
    image: "icons/stream-solid.svg",
    init: function (node)
	{
		$('.mb-3[data-group]').hide();
		if (node.dataset.type != undefined)
		{
			$('.mb-3[data-group="'+ node.dataset.type + '"]').show();
		} else
		{
			$('.mb-3[data-group]:first').show();
		}
	},
    html: `<section>
				<div class="container">
					<h1>Section</h1>
				</div>
			</section>`,
    properties: [
		...ComponentSectionContent,
		// ...ComponentSectionStyle,
		// ...ComponentSectionAdvanced
	]
});

Vvveb.Components.add("elements/header", {
    nodes: ["header"],
    name: "Header",
    image: "icons/stream-solid.svg",
    html: `<header>
				<div class="container">
					<h1>Header</h1>
				</div>
			</header>`,
    properties: [
		...ComponentSectionContent,
		...ComponentSectionStyle,
		...ComponentSectionAdvanced
	]
});


Vvveb.Components.add("elements/footer", {
    nodes: ["footer"],
    name: "Footer",
    image: "icons/stream-solid.svg",
    html: `<footer>
				<div class="container">
					<h1>Footer</h1>
				</div>
			</footer>`,
    properties: [
		...ComponentSectionContent,
		...ComponentSectionStyle,
		...ComponentSectionAdvanced
	]
});
