/** ----------------------------------------------------------------------------------
 *
 *      File            PinJoint.js
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

msw.PinJoint = msw.BaseDemo.extend  
({
	onEnter:function ( ) 
	{
		this._super ( );
		
		var		ball1 = this.createBall ( cc.p ( 100, 100 ), 50, cc.PHYSICSBODY_MATERIAL_DEFAULT );
		var		ball2 = this.createBall ( cc.p ( 400, 100 ), 50, cc.PHYSICSBODY_MATERIAL_DEFAULT );

		var		box1 = this.createBox ( cc.p ( 400, 200 ), cc.size ( 100, 100 ) );
		var		box2 = this.createBox ( cc.p ( 600, 400 ), cc.size ( 100, 100 ) );

		this.addChildEx ( ball1 );
		this.addChildEx ( ball2 );

		this.addChildEx ( box1 );
		this.addChildEx ( box2 );		

		var 	ball_joint = cc.PhysicsJointDistance.create ( ball1.getPhysicsBody ( ), ball2.getPhysicsBody ( ), cc.p ( 25, 0 ), cc.p ( -25,  0 ) );
	    var 	box_joint  = cc.PhysicsJointDistance.create ( box1 .getPhysicsBody ( ), box2 .getPhysicsBody ( ), cc.p (  0, 0 ), cc.p (  50, 50 ) );
	    this._world.addJoint ( ball_joint );
	    this._world.addJoint ( box_joint  );
	    	   
	    var 	box = null;
	    var 	chainJoint_distance = null;
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
	        	chainJoint_distance = cc.PhysicsJointDistance.create ( boxes [ i - 1 ].getPhysicsBody ( ), boxes [ i ].getPhysicsBody ( ), cc.p ( 10, 0 ), cc.p ( -10, 0 ) );
	        	chainJoint_distance.setDistance ( 10 );
	        	this._world.addJoint ( chainJoint_distance );
	        }
	    }	    	    
	},
	
	demo_info:function ( )
	{
		return "03 Pin Joint";
	},

	restartCallback:function ( sender )
	{
		cc.director.runScene ( msw.PinJoint.createScene ( ) );
	},	
});

msw.PinJoint.createScene = function ( )
{
	var 	scene = new cc.Scene ( );

	scene.initWithPhysics ( );
	scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
	scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -400 ) );

	var		layer = new msw.PinJoint ( );
	layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
	scene.addChild ( layer );

	return scene;
};