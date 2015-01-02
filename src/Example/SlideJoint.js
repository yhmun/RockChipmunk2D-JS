/** ----------------------------------------------------------------------------------
 *
 *      File            SlideJoint.js
 *      Ported By       Young-Hwan Mun
 *      Contact         yh.msw9@gmail.com
 * 
 * -----------------------------------------------------------------------------------
 *   
 *      Created By      ChildhoodAndy on 14-3-9    
 *
 * -----------------------------------------------------------------------------------
 * 
 *      Permission is hereby granted, free of charge, to any person obtaining a copy
 *      of this software and associated documentation files (the "Software"), to deal
 *      in the Software without restriction, including without limitation the rights
 *      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *      copies of the Software, and to permit persons to whom the Software is
 *      furnished to do so, subject to the following conditions:
 * 
 *      The above copyright notice and this permission notice shall be included in
 *      all copies or substantial portions of the Software.
 * 
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *      THE SOFTWARE.
 *
 * ----------------------------------------------------------------------------------- */ 

msw.SlideJoint = cc.SceneEx.extend 
({
	ctor:function ( ) 
	{
		this._super ( );

		var		BG = new cc.LayerColor ( cc.color ( 128, 128, 128, 128 ) );
		this.addChild ( BG );
		
		var		size = cc.winSize;
		var 	body = cc.PhysicsBody.createEdgeBox ( cc.size ( size.width - 20, size.height - 20 ), cc.PHYSICSBODY_MATERIAL_DEFAULT, 3 );				
	    this._wallNode = new cc.NodeEx ( );
	    body.setGroup ( 1 );
	    this._wallNode.setPosition ( size.width / 2, size.height / 2 );
	    this._wallNode.setPhysicsBody ( body );
	    this.addChild ( this._wallNode );	
	    
	    this.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
	    this.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -200 ) ); 
	    	    
    
	},
	
	createBox:function ( point, size )
	{
	    //Sprite* box = Sprite::create("YellowSquare.png");
	    //box->setScale(size.width/100.0f, size.height/100.0f);		
		var		box = new cc.NodeEx ( );
	    
	    var 	body = cc.PhysicsBody.createBox ( size );
	    box.setPhysicsBody ( body );
	    box.setPosition ( point );
	    box.setRotation ( cc.random0To1 ( ) * 360 );
	    body.setTag ( DRAG_BODYS_TAG );
	    
	    return box;
	    
	    /*
		var 	Body = new cp.Body ( 1, cp.momentForBox ( 1, Size.width, Size.height ) );
		Body.setPos ( Point );	
		this.Space.addBody ( Body );
				
		var 	Shape = new cp.BoxShape ( Body, Size.width, Size.height );
		Shape.setElasticity ( 0.5 );
		Shape.setFriction ( 0.5 );
		this.Space.addShape ( Shape );
		
		var 	Box = new cc.PhysicsSprite ( "res/YellowSquare.png" );
		var		BoxSize = Box.getContentSize ( );
		Box.setBody ( Body );	
		Box.setScale ( Size.width / BoxSize.width, Size.height / BoxSize.height );
		Box.setPosition ( Point );
		Box.setRotation ( cc.random0To1 ( ) * 360 );	
		Box.setTag ( DRAG_BODYS_TAG );
//		Body.setUserData ( Box );
	    */

		return Box;				
	},	
});
