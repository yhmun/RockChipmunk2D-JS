/** ----------------------------------------------------------------------------------
 *
 *      File            PivotJoint.js
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

BAMBOO_SEGMENTS_NUM = 11;
BAMBOO_SEGMENT_SIZE = cc.size ( 80, 20 );

msw.PivotJoint = msw.BaseDemo.extend  
({
	onEnter:function ( ) 
	{
		this._super ( );		
		
		var 	pierPosY = 100.0;
		var 	bridgePierL = this.createBox ( cc.p ( VisibleRect.center ( ).x - 400, pierPosY ), cc.size ( 40, 40 ) );
		var 	bridgePierR = this.createBox ( cc.p ( VisibleRect.center ( ).x + 400, pierPosY ), cc.size ( 40, 40 ) );
		bridgePierL.setRotation ( 0 );
		bridgePierR.setRotation ( 0 );
		bridgePierL.getPhysicsBody ( ).setDynamic ( false );
		bridgePierR.getPhysicsBody ( ).setDynamic ( false );
		bridgePierL.getPhysicsBody ( ).setTag ( 0 );
		bridgePierR.getPhysicsBody ( ).setTag ( 0 );
		this.addChildEx ( bridgePierL );
		this.addChildEx ( bridgePierR );
		
		var 	ballRadius = 40.0;
		var 	fallingBall = this.createBall ( cc.p ( VisibleRect.center ( ).x, VisibleRect.top ( ).y - ballRadius ), ballRadius );
		this.addChildEx ( fallingBall );
		
		var 	bamboos = new Array ( );
		for ( var i = 0; i < BAMBOO_SEGMENTS_NUM; i++ )
		{
			var 	box = this.createBox ( cc.p ( bridgePierL.getPositionX ( ) + BAMBOO_SEGMENT_SIZE.width * i, pierPosY ), BAMBOO_SEGMENT_SIZE );
			box.setRotation ( 0 );			
			this.addChildEx ( box );
			bamboos.push ( box );
		}		
				
		var 	pinJointL = cc.PhysicsJointPin.create ( bridgePierL.getPhysicsBody ( ), bamboos [ 0 ].getPhysicsBody ( ), bridgePierL.getPosition ( ) );
		var 	pinJointR = cc.PhysicsJointPin.create ( bridgePierR.getPhysicsBody ( ), bamboos [ bamboos.length - 1 ].getPhysicsBody ( ), bridgePierR.getPosition ( ) );
		pinJointL.setCollisionEnable ( false );
		pinJointR.setCollisionEnable ( false );
		this._world.addJoint ( pinJointL );
		this._world.addJoint ( pinJointR );   			
		
		for ( var i = 0; i < BAMBOO_SEGMENTS_NUM - 1; i++ )
		{
			var 	body1 = bamboos [ i + 0 ].getPhysicsBody ( );
			var 	body2 = bamboos [ i + 1 ].getPhysicsBody ( );

			var 	pivotJointUp   = cc.PhysicsJointPin.create ( body1, body2, cp.v.add ( bamboos [ i + 1 ].getPosition ( ), cc.p ( -BAMBOO_SEGMENT_SIZE.width / 2,  BAMBOO_SEGMENT_SIZE.height / 2 ) ) );
			var 	pivotJointDown = cc.PhysicsJointPin.create ( body1, body2, cp.v.add ( bamboos [ i + 1 ].getPosition ( ), cc.p ( -BAMBOO_SEGMENT_SIZE.width / 2, -BAMBOO_SEGMENT_SIZE.height / 2 ) ) );
			var  	springJoint    = cc.PhysicsJointRotarySpring.create ( body1, body2, 2000, 0.8 );

			pivotJointUp  .setCollisionEnable ( false );
			pivotJointDown.setCollisionEnable ( false );
			springJoint   .setCollisionEnable ( false );
			this._world.addJoint ( pivotJointUp   );
			this._world.addJoint ( pivotJointDown );
			this._world.addJoint ( springJoint    );
		}
	},

	demo_info:function ( )
	{
		return "06 Pivot Joint";
	},
	
	restartCallback:function ( sender )
	{
		var		scene = msw.PivotJoint.createScene ( );
		cc.director.runScene ( scene );
	},	
});

msw.PivotJoint.createScene = function ( )
{
    var 	scene = new cc.Scene ( );
    
    scene.initWithPhysics ( );
    scene.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
    scene.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -400 ) );
    
    var		layer = new msw.PivotJoint ( );
    layer.setPhysicWorld ( scene.getPhysicsWorld ( ) );
    scene.addChild ( layer );

    return scene;
};