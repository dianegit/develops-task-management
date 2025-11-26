from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    """Schema for login request."""
    email: str = Field(..., description="User email")
    password: str = Field(..., description="User password")


class TokenResponse(BaseModel):
    """Schema for token response."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshTokenRequest(BaseModel):
    """Schema for refresh token request."""
    refresh_token: str


class AccessTokenResponse(BaseModel):
    """Schema for access token response."""
    access_token: str
    token_type: str = "bearer"
