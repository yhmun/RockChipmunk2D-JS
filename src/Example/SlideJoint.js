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

msw.SlideJoint = msw.BaseScene.extend 
({
	ctor:function ( ) 
	{
		this._super ( );

		this.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -500 ) );
		
		var		Box1 = this.createBox ( cc.p ( 400, 200 ), cc.size ( 100, 100 ) );
		var		Box2 = this.createBox ( cc.p ( 600, 400 ), cc.size ( 100, 100 ) );		
		this.addChild ( Box1 );
		this.addChild ( Box2 );		
		
	    var 	BoxJoint  = cc.PhysicsJointLimit.create ( Box1.getPhysicsBody ( ), Box2.getPhysicsBody ( ), cc.p ( 0, 0 ), cc.p ( 0, 0 ), 120, 200 );
	    this.getPhysicsWorld ( ).addJoint ( BoxJoint );
	
	    var 	Box = null;
	    var 	ChainJointDistance = null;
	    var 	ChainLen = 10;
	    var 	Boxes = new Array ( );
	    for ( var i = 0; i < ChainLen; i++ )
	    {
	    	Box = this.createBox ( cc.p ( 500 + 40 * i, 600 ), cc.size ( 20, 10 ) );
	        this.addChild ( Box );
	        Boxes.push ( Box );
	        if ( i == 0 )
	        {
	            Box.getPhysicsBody ( ).setDynamic ( false );
	        }
	        
	        if ( i > 0 )
	        {
	        	ChainJointDistance = cc.PhysicsJointLimit.create ( Boxes [ i - 1 ].getPhysicsBody ( ), Boxes [ i ].getPhysicsBody ( ), cc.p ( 10, 0 ), cc.p ( -10, 0 ), 10, 20 );
	        	this.getPhysicsWorld ( ).addJoint ( ChainJointDistance );
	        }
	    }
	},
	
	demo_info:function ( )
	{
		return "04 Slide Joint";
	},

	restart:function ( Sender )
	{
		cc.director.runScene ( new msw.SlideJoint ( ) );
	},	
});
