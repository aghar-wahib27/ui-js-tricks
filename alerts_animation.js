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

var popUpChildren = {
	'1p':['popup-sign'],
	'2p':['popup-message'],
	'3button':['popup-close']
}

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
	constructor (Parent) {
		this.popUpParent = Parent
		this.popUpElement = new popUpComponent('div',['pop-up'],Parent)
		
		Object.keys(popUpChildren).forEach((child)=>{
			new popUpComponent( child.slice(1) , popUpChildren[child] , this.popUpElement.htmlTag )
		})

		this.popUpElement.htmlTag.querySelector('button').innerHTML = popUpSign['fail']
		this.popUpElement.htmlTag.querySelector('button').addEventListener('click',(e)=>{
			Parent.removeChild(this.popUpElement.htmlTag)

		})
		Object.keys(popUpStyling).forEach((style)=>{
			this.popUpElement.htmlTag.style[style]=popUpStyling[style]
		})

	}
	hideNotification(){
		document.querySelector('body').removeChild(document.querySelector('.pop-up')) 
	}
	setClass(newclass){
		this.popUpElement.htmlTag.classList.add(newclass)
	}
	setStylingAndType(type,styleObj){
		Object.keys(styleObj).forEach((style)=>{
			this.popUpElement.htmlTag.style[style] = styleObj[style]
		})
		this.popUpElement.htmlTag.querySelector('.popup-sign').innerHTML = popUpSign[type]
	}
	setMessage(mes){
		this.popUpElement.htmlTag.querySelector('.popup-message').innerHTML = mes
	}
}


