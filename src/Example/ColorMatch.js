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
		this._root		= null;
		this._father	= null;
		this._linkCount = 0;			
		this._ballColor = msw.rand ( ) % 6;
		this._radius 	= msw.rand ( ) % 10 + 30;
		
		this._super ( "res/ColorMatch/ball_" + this._ballColor + ".png" );  
		
		var 	ball_body = cc.PhysicsBody.createCircle ( this._radius, cc.PhysicsMaterial ( 1, 0.5, 0.2 ) );
		ball_body.setCategoryBitmask ( 0x0001 );
		ball_body.setContactTestBitmask ( 0x0001 );
		ball_body.setTag ( this._ballColor );		
		
		this.linkCountLabel = new cc.LabelTTF ( "", "Arial", 40 );		
		this.linkCountLabel.setColor ( cc.color ( 255, 255, 0, 255 ) );
		this.linkCountLabel.setPosition ( this._radius, this._radius );
		this.addChild ( this.linkCountLabel );		
			
		this.setPhysicsBody ( ball_body );
		this.setScale ( this._radius / 62.0 );
		this.setLinkCount ( 1 );
		this.setRoot ( this );
	},
	
	getBallColor:function ( )
	{
		return this._ballColor;
	},
	
	getRadius:function ( )
	{
		return this._radius;
	},
	
	getRoot:function ( )
	{
		if ( this._father != this ) 
		{
			this._father = this._father.getRoot ( );
		}

		return this._father;
	},

	setRoot:function ( root )
	{
		if ( root == this )
		{
			this._father = this;
		}
		else
		{
			this._father = root.getRoot ( );
		}
	},
	
	getFarther:function ( )
	{
		return this._father;
	},
	
	getLinkCount:function ( )
	{
		return this._linkCount;
	},
	
	setLinkCount:function ( linkCount )
	{
		this._linkCount = linkCount;
	}
});

WALL_ORIGIN		= cc.p ( 124, 99 );
WALL_SIZE		= cc.size ( 720, 560 );
BALL_TAG 		= 1;

msw.ColorMatch = cc.SceneEx.extend 
({
	ctor:function ( ) 
	{
		this._super ( );

		this.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
		this.getPhysicsWorld ( ).setGravity ( cp.v ( 0, -400 ) );	   
		this.getPhysicsWorld ( ).setDebugDrawMask ( cc.PhysicsWorld.DEBUGDRAW_ALL );
		this.DebugDraw = true;

		var		bg = new cc.Sprite ( "res/ColorMatch/bg.png" );
		bg.setPosition ( SCR_W2, SCR_H2 );
		this.addChild ( bg );

		var 	wall_body = cc.PhysicsBody.create ( );
		var 	l_shape = cc.PhysicsShapeEdgeSegment.create ( WALL_ORIGIN, cp.v.add ( WALL_ORIGIN, cc.p ( 0, WALL_SIZE.height ) ) );
		var 	b_shape = cc.PhysicsShapeEdgeSegment.create ( WALL_ORIGIN, cp.v.add ( WALL_ORIGIN, cc.p ( WALL_SIZE.width, 0 ) ) );
		var 	r_shape = cc.PhysicsShapeEdgeSegment.create ( cp.v.add ( WALL_ORIGIN, cc.p ( WALL_SIZE.width, 0 ) ), cp.v.add ( WALL_ORIGIN, cc.p ( WALL_SIZE.width, WALL_SIZE.height ) ) );
		wall_body.addShape ( l_shape );
		wall_body.addShape ( b_shape );
		wall_body.addShape ( r_shape );
		wall_body.setDynamic ( false );

		var 	wall_node = new cc.NodeEx ( );
		wall_node.setPhysicsBody ( wall_body );
		this.addChild ( wall_node );

		var		Back = new cc.MenuItemImage ( "res/backNormal.png", "res/backSelected.png", this.back, this );
		var		Restart = new cc.MenuItemImage ( "res/refreshNormal.png", "res/refreshSelected.png", this.restart, this );
				
		cc.MenuItemFont.setFontSize ( 18 );
		var		ToggleDebug = new cc.MenuItemFont ( "Toggle debug", this.toggleDebug, this );

		Back.setPosition ( SCR_W - 110, SCR_H - 80 );
		Restart.setPosition ( SCR_W - 200, SCR_H - 80 );		
		ToggleDebug.setPosition ( SCR_W - 50, SCR_H - 10 );

		var		Menu = new cc.Menu ( Back, Restart, ToggleDebug );
		Menu.setPosition ( 0, 0 );
		this.addChild ( Menu, 10 );		    
	    
		cc.eventManager.addListener 
		({
			event : cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches : true,
			onTouchBegan : this.onTouchBegan.bind ( this )
		}, this );		
		
		this._ticks = 0;
		this._balls = new Array ( );
		/*
	    auto contactListener = EventListenerPhysicsContact::create();
	    contactListener->onContactBegin = CC_CALLBACK_1(ColorMatchScene::onContactBegin, this);
	    contactListener->onContactPreSolve = CC_CALLBACK_2(ColorMatchScene::onContactPreSolve, this);
	    _eventDispatcher->addEventListenerWithSceneGraphPriority(contactListener, this);
	    */
	},
	
	addBall:function ( )
	{
		var 	ball = new msw.Ball ( );
		this.addChild ( ball );
		ball.setTag ( BALL_TAG );

		var 	bornPosX = cc.random0To1 ( ) * ( WALL_SIZE.width - ball.getRadius ( ) * 2 ) + WALL_ORIGIN.x + ball.getRadius ( );
		ball.setPosition ( bornPosX, 660 );
		this._balls.push ( ball );

		return ball;
	},

	removeBall:function ( ball )
	{
		ball.removeFromParentAndCleanup ( true );

//		ParticleSystem *particle = ParticleSystemQuad::create("pop.plist");
//		particle->setPosition(ball->getPosition());
//		particle->setAutoRemoveOnFinish(true);
//		this->addChild(particle, 10);

		this._balls.splice ( this._balls.indexOf ( ball ), 1 );
	
		cc.audioEngine.playEffect ( "res/ColorMatch/pop.wav" );		
	},
	
	update:function ( delta )
	{
		this._super ( delta );
		
		if ( this._ticks % 6 == 0 && this._balls.length < 70 )
		{
			this.addBall ( );
		}
		
		for ( var i = 0; i < this._balls.length; )
		{
			var		ball = this._balls [ i ];
			var 	root = ball.getRoot ( );
			
			ball.linkCountLabel.setString ( root.getLinkCount ( ) );
			if ( root.getLinkCount ( ) >= 4 )
			{
				this.removeBall ( ball );
				cc.audioEngine.playEffect ( "res/ColorMatch/ploop.wav" );	
				continue;
			}
			
			i++;
		}

		for( var idx in this._balls )
		{
			var		ball = this._balls [ idx ];
			ball.setLinkCount ( 1 );
			ball.setRoot ( ball );
		}
		
		this._ticks++;
	},
	
	setTouchEnabled:function ( Enable )
	{
		this.IsTouchEnable = Enable;
	},

	onTouchBegan:function ( Touch, Event )
	{
		var 	location = Touch.getLocation ( );
		var 	shape = this.getPhysicsWorld ( ).getShape ( location );
		if ( shape )
		{			
			var 	ball = shape.getBody ( ).getNode ( );
			if ( ball.getTag ( ) == BALL_TAG )
			{
				this.removeBall ( ball );
			}			
		}
		
		return true;
	},	

	back:function ( Sender )
	{
		cc.director.runScene ( new msw.ContentScene ( ) );
	},

	restart:function ( Sender )
	{
		cc.director.runScene ( new msw.ColorMatch ( ) );		
	},	

	toggleDebug:function ( Sender )
	{
		this.DebugDraw = !this.DebugDraw;	
		this.getPhysicsWorld ( ).setDebugDrawMask ( this.DebugDraw ? cc.PhysicsWorld.DEBUGDRAW_ALL : cc.PhysicsWorld.DEBUGDRAW_NONE );
	},		
});
