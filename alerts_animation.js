/* 
instead of using the typical alert fucntion js provides
you can use ``` animatedPopUp ``` , which you can customize more
*/
var popUpSign = {
	'danger':'&#x26A0',
	'success':'&#x2713',
	'fail':'&#10006'

}

var popUpStyling = {
	'width':'fit-content',
	'min-width':'200px',
	'max-width':'350px',
	'display':'flex',
	'flex-direction':'row-reverse',
	'position':'fixed',
	'margin':'20px',
	'align-items':'center',
	'border-radius':'15px',
	'padding':'10px',
	'z-index':'2000',
	'top':'20px',
	'right':'20px'
}

/*
 popUpChildren dictionary specifies the content of the pop up and thier classes ,  if you want
 to customize the content of the pop up , you ``` MUST ``` write  
 a children dictionary that follows this naming critera (index + element type) , so you avoid 
 same key names , then pass it to children argument
 */

var popUpChildren = {
	'1p':['popup-sign'],
	'2p':['popup-message'],
	'3button':['popup-close']
}


// the setStyle() method needs to be here then the animatedPopUp could inherit from it 
// and to allow any element to style itself
class popUpComponent{
	constructor(type,classes,Parent){
		this.htmlTag = document.createElement(type)
		classes.forEach((c)=>{
			this.htmlTag.classList.add(c)
		})
		this.Parent = Parent
		if(Parent){
			Parent.appendChild(this.htmlTag)
		}
	}
}

class animatedPopUp {
	constructor (Parent , children = popUpChildren , styling = popUpStyling) {
		this.popUpParent = Parent
		this.popUpElement = new popUpComponent('div',['pop-up'],Parent)
		
		Object.keys(children).forEach((child)=>{
			new popUpComponent( child.slice(1) , children[child] , this.popUpElement.htmlTag )
		})

		this.popUpElement.htmlTag.querySelector('button').innerHTML = popUpSign['fail']
		this.popUpElement.htmlTag.querySelector('button').addEventListener('click',(e)=>{
			Parent.removeChild(this.popUpElement.htmlTag)

		})
		Object.keys(styling).forEach((style)=>{
			this.popUpElement.htmlTag.style[style]=styling[style]
		})

	}
	// From ES6/ES2015, default parameters are in the language specification.
	hideNotification(duration = 5000){
		setTimeout( function(){
					document.querySelector('body').removeChild(document.querySelector('.pop-up'))
					},
				   duration
				  ) 
	}
	setClasses(new_classes=[]){
		new_classes.forEach( (new_class)=>{
			this.popUpElement.htmlTag.classList.add(new_class)
		}
		)
	}
	setStylingAndType(type = 'success' , styleObj={}){
		Object.keys(styleObj).forEach((style)=>{
			this.popUpElement.htmlTag.style[style] = styleObj[style]
		})
		this.popUpElement.htmlTag.querySelector('.popup-sign').innerHTML = popUpSign[type]
	}
	setMessage(mes='default message'){
		this.popUpElement.htmlTag.querySelector('.popup-message').innerHTML = mes
	}
}



