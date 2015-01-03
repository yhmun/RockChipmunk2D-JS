/** ----------------------------------------------------------------------------------
 *
 *      File            ColorMatch.js
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

msw.Ball = cc.SpriteEx.extend 
({
	ctor:function ( )
	{
		this._super ( );
		
		this.init ( );
	},
    
	init:function ( )
	{
		
	},
	
	/*
    _ballColor, BallColor);
    CC_SYNTHESIZE(int, _radius, Radius);

    void setRoot(Ball* root);
    Ball* getRoot();
    
    Ball* getFather();
    void setFather(Ball* father);
    CC_SYNTHESIZE(int, _linkCount, LinkCount);
    
    cocos2d::Label* linkCountLabel;
private:
    Ball* _father;
    Ball* _root;
    */
});

WALL_ORIGIN		= cc.p ( 124, 99 );
WALL_SIZE		= cc.size ( 720, 530 );
BALL_TAG 		= 1;

msw.ColorMatch = cc.SceneEx.extend 
({
	ctor:function ( ) 
	{
		this._super ( );
		
		this.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
		this.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -400 ) );

		var		bg = new cc.Sprite ( "res/ColorMatch/bg.png" );
		bg.setPosition ( SCR_W2, SCR_H2 );
		this.addChild ( bg );

	    var 	wall_body = cc.PhysicsBody.create ( );
	    var 	l_shape = cc.PhysicsShapeEdgeSegment.create ( WALL_ORIGIN, cp.v.add ( WALL_ORIGIN, cc.p ( 0, WALL_SIZE.height ) ) );
	    var 	b_shape = cc.PhysicsShapeEdgeSegment.create ( WALL_ORIGIN, cp.v.add ( WALL_ORIGIN, cc.p ( WALL_SIZE.width, 0 ) ) );
	    var 	r_shape = cc.PhysicsShapeEdgeSegment.create ( WALL_ORIGIN + cc.p ( WALL_SIZE.width, 0 ), cp.v.add ( WALL_ORIGIN, cc.p ( WALL_SIZE.width, WALL_SIZE.height ) ) );
	    wall_body.addShape ( l_shape );
	    wall_body.addShape ( b_shape );
	    wall_body.addShape ( r_shape );
	    wall_body.setDynamic ( false );
	    
	    var 	wall_node = new cc.NodeEx ( );
	    wall_node.setPhysicsBody ( wall_body );
	    this.addChild ( wall_node );
	    
	},
});
