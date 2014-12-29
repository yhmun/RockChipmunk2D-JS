/** ----------------------------------------------------------------------------------
 *
 *      File            RollingBall.js
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

msw.RollingBall = msw.BaseScene.extend 
({
	ctor:function ( ) 
	{
		this._super ( );
		
		this.VertEgg = 
		[
		 	  1.9,  88.2,
		 	 41.8,  67.5,
		 	 64.1,  25.2,
		 	 66.3, -32.5,
		  	 44.5, -66.6,
		 	  0.8, -87.4,
		 	-44.1, -68.4,
		 	-62.6, -34.9,
		 	-62.1,  27.8,
		 	-39.7,  68.9
		];
		
		this.VertCai = 
		[			 
			  9.8,  51.9,
			 25.3,  46.1,
			 39.7,  40.3,
			 45.9,  29.3,
			 54.0,  15.0,
			 53.5,   2.6,
			 58.2, -18.7,
			 48.5, -27.6,
			 29.9, -23.0,
			 16.4, -26.4,
			  6.7, -22.4,
			- 9.4, -29.6,
			-22.7, -41.8,
			-38.6, -56.6,
			-57.5, -42.0,
			-39.6, -24.0,
			-24.4,   4.2,
			-32.7,  13.1,
			-26.5,  27.3,
			-31.7,  40.6,
			-21.2,  56.7,
			- 2.3,  57.1,
		];		
	},
	
	demo_info:function ( )
	{
		return "02 Rolling Ball";
	},
	
	restart:function ( Sender )
	{
		cc.director.runScene ( new msw.RollingBall ( ) );
	},
	
	onTouchBegan:function ( Touch )
	{
		return true;
	},	
	
	onTouchEnded:function ( Touch )
	{
		this.addNewSpriteAtPosition ( Touch.getLocation ( ) );
	},		
	
	addNewSpriteAtPosition:function ( Point )
	{
		var		RandIdx = msw.rand ( ) % 3;
		var		Space   = this.Space;
		var 	Sprite  = null;		
		var 	Body 	= null; 			
		var 	Shape 	= null; 
		
		switch ( RandIdx )
		{
			case 0 : 
				Body = new cp.Body ( 1, cp.momentForPoly ( 1, this.VertEgg, cp.vzero ) );
				Body.setPos ( Point );	
				this.Space.addBody ( Body );
				
				Shape = new cp.PolyShape ( Body, this.VertEgg, cp.vzero );
				Shape.setElasticity ( 1 );
				Shape.setFriction ( 1 );
				this.Space.addShape ( Shape );
				
				Sprite = new cc.PhysicsSprite ( "res/egg.png" );
				Sprite.setTag ( 0 );
				break;
				
			case 1 :
				Body = new cp.Body ( 1, 100 );
				Body.setPos ( Point );	
				this.Space.addBody ( Body );
				
				Shape = new cp.CircleShape ( Body, 55, cp.v ( 0, 0 ) );
				Shape.setElasticity ( 1 );
				Shape.setFriction ( 1 );
				this.Space.addShape ( Shape );
				
				/*
				var		Count = this.VertCai / 2;
				for ( var i = 0; i < Count; i++ )
				{
					Shape = new cp.SegmentShape ( Body, this.VertCai [ i * 2 ], this.VertCai [ ( ( i + 1 ) % Count ) * 2 + 1 ], 1 );
					Shape.setElasticity ( 1 );
					Shape.setFriction ( 1 );	
					this.Space.addShape ( Shape );
				}
				*/
								
				Sprite = new cc.PhysicsSprite ( "res/cai1.png" );
				Sprite.setTag ( 1 );
				break;
				
			case 2 :
				Body = new cp.Body ( 1, cp.momentForCircle ( 1, 0, 55, cp.v ( 0, 0 ) ) );
				Body.setPos ( Point );	
				this.Space.addBody ( Body );
				
				Shape = new cp.CircleShape ( Body, 55, cp.v ( 0, 0 ) );
				Shape.setElasticity ( 1 );
				Shape.setFriction ( 1 );
				this.Space.addShape ( Shape );
				
				Sprite = new cc.PhysicsSprite ( "res/cai2.png" );
				Sprite.setTag ( 2 );
				break;
		}
		
		Sprite.setBody ( Body );
		Sprite.setPosition ( Point );
		Sprite.setOpacity ( 128 );
		this.addChild ( Sprite );
	},
});
