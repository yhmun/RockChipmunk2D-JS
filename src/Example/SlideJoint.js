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

msw.SlideJoint = msw.BaseDemo.extend 
({
	onEnter:function ( ) 
	{
		this._super ( );

		var		box1 = this.createBox ( cc.p ( 400, 200 ), cc.size ( 100, 100 ) );
		var		box2 = this.createBox ( cc.p ( 600, 400 ), cc.size ( 100, 100 ) );		
		this.addChildEx ( box1 );
		this.addChildEx ( box2 );		
		
	    var 	box_joint  = cc.PhysicsJointLimit.create ( box1.getPhysicsBody ( ), box2.getPhysicsBody ( ), cc.p ( 0, 0 ), cc.p ( 0, 0 ), 120, 200 );
	    this._world.addJoint ( box_joint );
	
	    var 	box = null;
	    var 	chainJoint_limit = null;
	    var 	chainLen = 10;
	    var 	boxes = new Array ( );
	    for ( var i = 0; i < chainLen; i++ )
	    {
	    	box = this.createBox ( cc.p ( 500 + 40 * i, 600 ), cc.size ( 20, 10 ) );
	        this.addChildEx ( box );
	        boxes.push ( box );
	        
	        if ( i == 0 )
	        {
	            box.getPhysicsBody ( ).setDynamic ( false );
	        }
	        
	        if ( i > 0 )
	        {
	        	chainJoint_limit = cc.PhysicsJointLimit.create ( boxes [ i - 1 ].getPhysicsBody ( ), boxes [ i ].getPhysicsBody ( ), cc.p ( 10, 0 ), cc.p ( -10, 0 ), 10, 20 );
	        	this._world.addJoint ( chainJoint_limit );
	        }
	    }
	},
	
	demo_info:function ( )
	{
		return "04 Slide Joint";
	},
	
	restartCallback:function ( sender )
	{
		cc.director.runScene ( msw.SlideJoint.createScene ( ) );
	},	
});

msw.SlideJoint.createScene = function ( )
{
	var 	scene = new cc.Scene ( );

	scene.initWithPhysics ( );
	scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
	scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -500 ) );

	var		layer = new msw.SlideJoint ( );
	layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
	scene.addChild ( layer );

	return scene;
};
