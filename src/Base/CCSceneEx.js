/****************************************************************************
 Copyright (c) 2015 Young-Hwan Mun (yh.msw9@gmail.com)
 Copyright (c) 2013 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

cc.SceneEx = cc.Scene.extend
({
	ctor:function ( ) 
	{
		cc.Scene.prototype.ctor.call ( this );
	
		this._physicsWorld = null;
		
		this.initWithPhysics ( );
	},
	
	onExit:function ( )
	{		
		cc.Scene.prototype.onExit.call ( this );		
	},
	
	addChild:function ( child, localZOrder, tag )
	{
		if ( localZOrder === undefined ) localZOrder = 0;
		if ( tag === undefined ) tag = 0;
	
		cc.Scene.prototype.addChild.call ( this, child, localZOrder, tag );
		
		this.addChildToPhysicsWorld ( child );
	},
	
	update:function ( delta )
	{
		if ( null != this._physicsWorld && this._physicsWorld.isAutoStep ( ) )
		{
			this._physicsWorld.update ( delta );
		}		
	},
	
	getPhysicsWorld:function ( )
	{
		return this._physicsWorld; 
	},
	
	initWithPhysics:function ( )
	{
		this.setContentSize ( cc.winSize );
		
		this._physicsWorld = new cc.PhysicsWorld ( this );

		this.scheduleUpdate ( );
		
		// success
		cc.g_physicsSceneCount += 1;
		
		return true;	
	},

	addChildToPhysicsWorld:function ( child )
	{
		// temporary code
		if ( !( child instanceof cc.NodeEx || child instanceof cc.SpriteEx ) )
		{
			return;
		}
		
		if ( this._physicsWorld )
		{
			var		world = this._physicsWorld;
			var		addToPhysicsWorldFunc = function ( node )
			{
				// temporary code
				if (  !( node instanceof cc.NodeEx || child instanceof cc.SpriteEx ) )
				{
					return;
				}
				
				if ( node.getPhysicsBody ( ) )
				{
					world.addBody ( node.getPhysicsBody ( ) );
				}
				
				var		children = node.getChildren ( );
				for ( var idx in children )
				{
					var		n = children [ idx ];
					addToPhysicsWorldFunc ( n );
				}
			};
			
			addToPhysicsWorldFunc ( child );
		}
	},	
});